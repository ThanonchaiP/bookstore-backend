import { Controller, Get, Post, Body, Patch, Param, Query, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { UserQueryParamDto } from './dto/user-query-param.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AdminJwtAuthGuard } from 'src/common/guards/admin-jwt-auth.guard';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { UpdatePasswordUserDto } from './dto/update-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return { message: 'Success', data: { id: result.id } };
  }

  @Get()
  @UseGuards(AdminJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Query() params: UserQueryParamDto) {
    return this.userService.findAll(pageOptionsDto, params);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  async findOne(@Param('id') id: string, @Req() req: any) {
    if (id !== req.user.id) throw new UnauthorizedException();

    const user = await this.userService.findOne(id);
    return { data: user };
  }

  @Patch('password')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  async updatePassword(@Req() req: any, @Body() params: UpdatePasswordUserDto) {
    const userId = req.user.id;
    return await this.userService.updatePassword(userId, params);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
    return { message: 'Success' };
  }
}
