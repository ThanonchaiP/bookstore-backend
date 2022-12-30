import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class refreshTokenDto {
  @ApiProperty()
  refreshToken: string;
}
