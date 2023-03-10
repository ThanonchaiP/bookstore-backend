import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  shippingFee: number;

  @ApiProperty()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  totalQty: number;

  @ApiProperty()
  @IsNotEmpty()
  orderDate: Date;

  @ApiProperty({ isArray: true })
  items: {
    order: { id: string };
    cartItemId: string;
    book: { id: string };
    quantity: number;
  }[];
}
