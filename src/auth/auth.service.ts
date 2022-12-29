import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const { email, password } = body;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Incorrect username or password.');

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Incorrect username or password.');

    //generate token
    const token = await this.jwtService.signAsync(
      { user_id: user.id, role: user.role },
      { secret: process.env.JWT_SECRET },
    );

    return {
      data: {
        access_token: token,
      },
    };
  }
}
