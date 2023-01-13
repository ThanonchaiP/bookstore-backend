import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
