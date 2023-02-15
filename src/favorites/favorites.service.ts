import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const { bookId, userId } = createFavoriteDto;

    const favorite = await this.favoriteRepository.save({
      book: { id: bookId },
      user: { id: userId },
    });

    return { id: favorite.id };
  }

  async me(userId: string, pageOptions: PageOptionsDto) {
    const { skip, limit = 10 } = pageOptions;

    const queryBuilder = this.favoriteRepository.createQueryBuilder('favorite');
    queryBuilder.where('favorite.user = :userId', { userId });
    queryBuilder.leftJoin('favorite.book', 'book').addSelect(['book.id', 'book.name', 'book.price', 'book.image']);
    queryBuilder.leftJoin('book.author', 'author').addSelect(['author.id', 'author.name']);
    queryBuilder.leftJoinAndSelect('book.publisher', 'publisher');
    queryBuilder.leftJoinAndSelect('book.category', 'category');
    queryBuilder.skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: pageOptions });

    return new PageDto(entities, pageMetaDto);
  }

  async remove(id: string) {
    return await this.favoriteRepository.delete(id);
  }
}
