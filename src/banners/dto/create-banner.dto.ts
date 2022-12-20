import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty()
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
