import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { BooksService } from './books.service';
import { BookQueryParamDto } from './dto/book-query-param.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Book')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const result = await this.booksService.create(createBookDto);
    return { data: result };
  }

  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) params: BookQueryParamDto,
    @Query() pageOptions: PageOptionsDto,
  ) {
    return await this.booksService.findAll(params, pageOptions);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.booksService.findOne(id) };
  }

  @Get('recommend/best-seller')
  async bestSeller(@Query() pageOptions: PageOptionsDto) {
    return { data: await this.booksService.bestSeller(pageOptions) };
  }

  @Get('recommend/new-book')
  async newBook(@Query() pageOptions: PageOptionsDto) {
    return { data: await this.booksService.newBook(pageOptions) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}
