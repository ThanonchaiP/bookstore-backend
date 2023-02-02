import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;
}
