import { Cart } from 'src/cart/entities/cart.entity';
import { Book } from 'src/books/entities/book.entity';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, Entity } from 'typeorm';

@Entity({
  name: 'cartItem',
})
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => Book, (book) => book.cartItems)
  book: Book;
}
