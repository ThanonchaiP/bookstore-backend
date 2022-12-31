import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PublisherQueryParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly search?: string;
}
