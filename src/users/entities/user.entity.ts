import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Role } from '../enum/user.enum';
import { Review } from 'src/reviews/entities/review.entity';

@Entity({
  name: 'user',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column('enum', { enum: Role, array: true, default: [Role.User] })
  role: Role[];

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
