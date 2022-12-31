import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { PublisherQueryParamDto } from './dto/publisher-query-param.dto';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: Repository<Publisher>,
  ) {}

  async create(createPublisherDto: CreatePublisherDto) {
    return await this.publisherRepository.save(createPublisherDto);
  }

  async findAll(params: PublisherQueryParamDto, pageOptionsDto: PageOptionsDto) {
    const { search } = params;
    const { skip, limit } = pageOptionsDto;

    const queryBuilder = this.publisherRepository.createQueryBuilder('publisher');

    if (search) {
      queryBuilder.where('publisher.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    return await this.publisherRepository.findOne({ where: { id } });
  }
}
