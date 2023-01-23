import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { Order } from 'src/common/constants';

export class BookQueryParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly authorId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly publisherId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  readonly category?: number[];

  @ApiProperty({ required: false, default: 0 })
  readonly min: number;

  @ApiProperty({ required: false, default: 10000 })
  readonly max: number;

  @ApiProperty({ required: false })
  readonly orderBy: string;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly op: Order = Order.ASC;
}
