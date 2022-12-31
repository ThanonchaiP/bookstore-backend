import { ApiProperty } from '@nestjs/swagger';

export class CreatePublisherDto {
  @ApiProperty()
  name: string;
}
