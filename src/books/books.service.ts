import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
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
    const { authorId, publisherId } = createBookDto;

    const book = await this.bookRepository.save({
      ...createBookDto,
      author: { id: authorId },
      publisher: { id: publisherId },
    });

    return { id: book.id };
  }

  async findAll(params: BookQueryParamDto, pageOptions: PageOptionsDto) {
    const { search, authorId, publisherId, category, orderBy, op, min, max } = params;
    const { skip, limit } = pageOptions;

    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    queryBuilder.select(['book.id', 'book.name', 'book.price', 'book.publishedDate', 'book.sold', 'book.image']);
    queryBuilder.leftJoin('book.author', 'author').addSelect(['author.id', 'author.name']);
    queryBuilder.leftJoinAndSelect('book.category', 'category');
    queryBuilder.leftJoinAndSelect('book.publisher', 'publisher');

    if (authorId) queryBuilder.andWhere('author.id = :authorId', { authorId });

    if (category?.length > 1) {
      queryBuilder.andWhere('category.id IN (:...categories)', { categories: category });
    } else if (category) {
      queryBuilder.andWhere('category.id = :categoryId', { categoryId: category });
    }

    if (publisherId) queryBuilder.andWhere('publisher.id = :publisherId', { publisherId });

    if (search) {
      queryBuilder
        .andWhere('book.name LIKE :search')
        .orWhere('author.name LIKE :search')
        .orWhere('category.name LIKE :search')
        .orWhere('publisher.name LIKE :search')
        .setParameter('search', `%${search}%`);
    }

    if (min && max) queryBuilder.andWhere(`book.price BETWEEN '${min}' AND '${max}'`);

    queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy(orderBy ? `book.${orderBy}` : 'book.name', op || 'ASC');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: pageOptions });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    return await this.bookRepository.findOne({ where: { id } });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const { authorId, publisherId } = updateBookDto;

    if (authorId) updateBookDto.author.id = authorId;
    if (publisherId) updateBookDto.publisher.id = publisherId;

    return await this.bookRepository.update(id, updateBookDto);
  }

  async remove(id: string) {
    return await this.bookRepository.delete(id);
  }

  async bestSeller(pageOptions: PageOptionsDto) {
    const { skip, limit } = pageOptions;

    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    queryBuilder.select(['book.id', 'book.name', 'book.price', 'book.sold']);
    queryBuilder.leftJoin('book.author', 'author').addSelect(['author.id', 'author.name']);
    queryBuilder.leftJoinAndSelect('book.category', 'category');
    queryBuilder.leftJoinAndSelect('book.publisher', 'publisher');
    queryBuilder.skip(skip).take(limit).orderBy('book.sold', 'DESC');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: pageOptions });

    return new PageDto(entities, pageMetaDto);
  }

  async newBook(pageOptions: PageOptionsDto) {
    const { skip, limit } = pageOptions;

    const queryBuilder = this.bookRepository.createQueryBuilder('book');
    queryBuilder.select(['book.id', 'book.name', 'book.price', 'book.sold', 'book.publishedDate']);
    queryBuilder.leftJoin('book.author', 'author').addSelect(['author.id', 'author.name']);
    queryBuilder.leftJoinAndSelect('book.category', 'category');
    queryBuilder.leftJoinAndSelect('book.publisher', 'publisher');
    queryBuilder.skip(skip).take(limit).orderBy('book.publishedDate', 'ASC');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: pageOptions });

    return new PageDto(entities, pageMetaDto);
  }
}
