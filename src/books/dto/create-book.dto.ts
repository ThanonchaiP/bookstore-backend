import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  pageNumber: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  publisherId: string;

  @ApiProperty()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty()
  publishedDate: Date;
}
