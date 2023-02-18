import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'review',
})
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.review)
  orderItems: OrderItem[];
}
