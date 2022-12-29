import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'abc123@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123456' })
  password: string;
}
