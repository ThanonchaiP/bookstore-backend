import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { ApiTags } from '@nestjs/swagger';
import { PublisherQueryParamDto } from './dto/publisher-query-param.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

@ApiTags('Publisher')
@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  async create(@Body() createPublisherDto: CreatePublisherDto) {
    return { data: await this.publisherService.create(createPublisherDto) };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() pageOptionsDto: PageOptionsDto, @Query() params: PublisherQueryParamDto) {
    return { data: await this.publisherService.findAll(params, pageOptionsDto) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.publisherService.findOne(id) };
  }
}
