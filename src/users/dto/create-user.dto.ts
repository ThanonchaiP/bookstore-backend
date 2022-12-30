import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../enum/user.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ default: [Role.User] })
  role: Role[];

  @ApiProperty()
  image: string;

  @ApiProperty({ default: null })
  refreshToken: string;
}
