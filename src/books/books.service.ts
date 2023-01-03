import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { Repository } from 'typeorm';
import { BookQueryParamDto } from './dto/book-query-param.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.save({
      ...createBookDto,
    });

    return book;
  }

  async findAll(params: BookQueryParamDto, pageOptions: PageOptionsDto) {
    const { search } = params;
    const { skip, limit } = pageOptions;
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (search) {
      queryBuilder.where('book.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: pageOptions });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: string) {
    return await this.bookRepository.delete(id);
  }
}
