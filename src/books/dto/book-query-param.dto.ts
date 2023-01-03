import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BookQueryParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly search?: string;
}
