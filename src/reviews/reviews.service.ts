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
    queryBuilder.leftJoin('review.user', 'user').addSelect(['user.id', 'user.firstname']);
    queryBuilder.leftJoin('review.orderItems', 'orderItems');
    queryBuilder.where('orderItems.book = :id', { id });
    queryBuilder.orderBy('review.createdAt', 'DESC');

    const reviews = await queryBuilder.getMany();
    const ratingAvg = reviews.reduce((sum, item) => item.rating + sum, 0) / reviews.length || 0;

    const ratingStar = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .where('orderItem.book = :id', { id })
      .leftJoin('orderItem.review', 'review')
      .select('review.rating, COUNT(review.id) count')
      .groupBy('review.rating')
      .orderBy('review.rating', 'ASC')
      .getRawMany();

    const ratingStartResult = [];
    if (reviews.length > 0) {
      for (let i = 0; i < 5; i++) {
        const exist = ratingStar.find((item) => item.rating === i + 1);
        if (exist) {
          ratingStartResult.push({ ...exist, percent: (exist.count / reviews.length) * 100 });
        } else ratingStartResult.push({ rating: i + 1, count: 0, percent: 0 });
      }
    }

    return { reviews, ratingStar: ratingStartResult, ratingAvg };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewRepository.update(id, updateReviewDto);
  }
}
