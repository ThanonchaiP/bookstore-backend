/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@ApiTags('Banner')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannersService.create(createBannerDto);
  }

  @Get()
  async findAll() {
    return await this.bannersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.bannersService.findOne(+id) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannersService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bannersService.remove(+id);
  }
}
