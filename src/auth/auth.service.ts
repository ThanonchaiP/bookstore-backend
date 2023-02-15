import * as argon2 from 'argon2';
import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Cart } from 'src/cart/entities/cart.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Check if user exists
    if (await this.usersService.findByEmail(email)) {
      throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
    }

    const newUser = await this.userRepository.save({
      ...createUserDto,
      password: await argon2.hash(password),
    });

    //Create Cart
    await this.cartRepository.save({ user: { id: newUser.id } });

    const tokens = await this.getTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return { data: tokens };
  }

  async signIn(body: AuthDto) {
    const { email, password } = body;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Incorrect username or password.');

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Incorrect username or password.');

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { data: { user: user.id, token: tokens } };
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: null });
    return { message: 'Success' };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon2.verify(user.refreshToken, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { data: tokens };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id: user.id, role: user.role },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        { id: user.id, role: user.role },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
