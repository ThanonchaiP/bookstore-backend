import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    const { bookId, orderItemId, ...rest } = createReviewDto;

    const review = await this.reviewRepository.save({
      ...rest,
      book: { id: bookId },
      user: { id: userId },
    });

    //update table orderItem
    await this.orderItemRepository.update(orderItemId, { review: { id: review.id } });

    return { id: review.id };
  }

  async getReviewById(id: number) {
    return await this.reviewRepository.findOne({ where: { id } });
  }

  async getReviewsByBookId(id: string) {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');
    queryBuilder.leftJoin('review.orderItems', 'orderItems');
    queryBuilder.where('orderItems.book = :id', { id });
    return await queryBuilder.getMany();
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewRepository.update(id, updateReviewDto);
  }
}
