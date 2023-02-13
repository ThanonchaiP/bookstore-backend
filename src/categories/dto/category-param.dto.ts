import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Order } from 'src/common/constants';

export class CategoryParamDto {
  @ApiProperty({ required: false })
  readonly orderBy: string;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly op: Order = Order.ASC;
}
