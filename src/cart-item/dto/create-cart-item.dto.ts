import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty()
  bookId: string;

  @ApiProperty()
  cartId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;
}
