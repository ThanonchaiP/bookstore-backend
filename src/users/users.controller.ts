import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserQueryParams } from './interface/user.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return { message: 'Success', data: { id: result.id } };
  }

  @Get()
  @ApiQuery({ name: 'limit', type: 'number', example: 20, required: false })
  @ApiQuery({ name: 'page', type: 'number', example: 1, required: false })
  async findAll(@Query() query: UserQueryParams) {
    const { page, limit } = query;
    const queryParams = { page: page || 1, limit: limit || 20 };

    const user = await this.usersService.findAll(queryParams);
    return { data: user };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return { data: user };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(id, updateUserDto);
    return { message: 'Success' };
  }
}
