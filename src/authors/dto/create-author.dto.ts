import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateAuthorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;
}
