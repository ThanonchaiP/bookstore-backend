import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, OrderItem])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
