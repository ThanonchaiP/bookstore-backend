import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty()
  @IsNotEmpty()
  orderItemId: string;
}
