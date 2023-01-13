import { Book } from 'src/books/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'category',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}
