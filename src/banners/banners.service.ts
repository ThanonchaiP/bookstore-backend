/* eslint-disable prettier/prettier */
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    try {
      const queryBuilder = this.bannerRepository.createQueryBuilder('banner');
      const result = await queryBuilder.insert().values(createBannerDto).execute();

      return { statusCode: 201, message: 'Success', data: result.identifiers[0] };
    } catch (error) {}
  }

  async findAll() {
    const now = moment().format();

    const result = await this.bannerRepository
      .createQueryBuilder('banner')
      .where('banner.start <= :startDate', { startDate: now })
      .andWhere('banner.end >= :endDate', { endDate: now })
      .andWhere('banner.active = :active', { active: true })
      .getMany();

    return { data: result };
  }

  async findOne(id: number) {
    return await this.bannerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const queryBuilder = this.bannerRepository.createQueryBuilder('banner');
    return await queryBuilder.update().set(updateBannerDto).where('id = :id', { id }).execute();
  }

  async remove(id: number) {
    return await this.bannerRepository.delete(id);
  }
}
