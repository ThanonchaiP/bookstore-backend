import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserQueryParams } from './interface/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { firstname, lastname, email, password, phone, role, image } =
      createUserDto;

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

    return await this.usersRepository.save(user);
  }

  async findAll(query?: UserQueryParams) {
    const { page, limit } = query;
    console.log(query);

    return await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.usersRepository.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }
}
