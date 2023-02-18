import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity({
  name: 'orderItem',
})
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Book, (book) => book.orderItems, { onDelete: 'CASCADE' })
  book: Book;

  @ManyToOne(() => Review, (review) => review.orderItems, { onDelete: 'CASCADE' })
  review: Review;
}
