import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BookQueryParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly authorId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly publisherId?: string;
}
