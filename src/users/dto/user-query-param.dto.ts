import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserQueryParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly search?: string;
}
