import { Controller, Post, Body, HttpCode, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
  }

  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() body: AuthDto) {
    return await this.authService.signIn(body);
  }

  @Get('logout')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  async logout(@Req() req: any) {
    return await this.authService.logout(req.user.id);
  }

  @Post('refresh-token')
  @ApiBearerAuth('access-token')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  async refreshTokens(@Body() body: refreshTokenDto, @Req() req: any) {
    const userId = req.user.id;
    const refreshToken = body.refreshToken;
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
