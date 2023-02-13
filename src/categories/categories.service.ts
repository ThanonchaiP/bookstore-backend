import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { CategoryParamDto } from './dto/category-param.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async getCategory() {
    return { message: 'Success', data: await this.categoryRepository.find() };
  }

  async getCategoryById(id: number, params: CategoryParamDto, pageOptions: PageOptionsDto) {
    const { skip, limit = 15 } = pageOptions;
    const { orderBy, op } = params;

    const category = await this.categoryRepository.findOne({ where: { id } });
    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    queryBuilder.select(['book.id', 'book.name', 'book.price', 'book.publishedDate', 'book.sold', 'book.image']);
    queryBuilder.leftJoin('book.author', 'author').addSelect(['author.id', 'author.name']);
    queryBuilder.leftJoin('book.category', 'category').where('category.id = :id', { id }).addSelect(['category.name']);
    queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy(orderBy ? `book.${orderBy}` : 'book.name', op || 'ASC');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: pageOptions });
    const pageDto = new PageDto(entities, pageMetaDto);

    const response = { data: { category: category, book: pageDto.data }, meta: pageDto.meta };
    return response;
  }
}
