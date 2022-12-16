import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enum/user.enum';

export class CreateUserDto {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ default: [Role.User] })
  role: Role[];

  @ApiProperty()
  image: string;
}
