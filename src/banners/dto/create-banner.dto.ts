import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBannerDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;

  @ApiProperty()
  link: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  image: string;
}
