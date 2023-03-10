/* eslint-disable prettier/prettier */
import * as argon2 from 'argon2';
import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { UserQueryParamDto } from './dto/user-query-param.dto';
import { UpdatePasswordUserDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { firstname, lastname, email, password, phone, role, image } = createUserDto;

    if (await this.findByEmail(email)) {
      throw new HttpException('Email already exists.', HttpStatus.CONFLICT);
    }

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = await argon2.hash(password);
    user.phone = phone;
    user.role = role;
    user.image = image;

    return await this.userRepository.save(user);
  }

  async findAll(pageOptionsDto: PageOptionsDto, params: UserQueryParamDto) {
    const { search } = params;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder.where('user.firstname LIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.skip(pageOptionsDto.skip).take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      delete user.password;

      return user;
    } catch (error) {}
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(id: string, updatePasswordUserDto: UpdatePasswordUserDto) {
    const { password, newPassword } = updatePasswordUserDto;
    const user = await this.userRepository.findOne({ where: { id } });

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) throw new UnauthorizedException('Incorrect password.');

    return await this.userRepository.update(id, { password: await argon2.hash(newPassword) });
  }
}
