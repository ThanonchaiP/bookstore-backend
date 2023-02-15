import { Author } from 'src/authors/entities/author.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'book',
})
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  pageNumber: number;

  @Column()
  image: string;

  @Column()
  publishedDate: Date;

  @Column({ default: 0 })
  sold: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  publisher: Publisher;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToOne(() => Category, (category) => category.books)
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  public cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItems) => orderItems.book)
  public orderItems: OrderItem[];

  @OneToMany(() => Favorite, (favorite) => favorite.book)
  public favorites: Favorite[];

  @AfterLoad()
  getUrl(): void {
    this.image = `${process.env.URL}/images/book/${this.image}`;
  }
}
