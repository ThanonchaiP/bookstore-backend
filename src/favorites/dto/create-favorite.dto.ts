import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
