import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({
  name: 'orderItem',
})
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Book, (book) => book.orderItems)
  book: Book;
}
