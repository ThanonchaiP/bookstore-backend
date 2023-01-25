import { Book } from 'src/books/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad } from 'typeorm';

@Entity({
  name: 'category',
})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];

  @AfterLoad()
  getUrl(): void {
    this.image = `${process.env.URL}/images/category/${this.image}`;
  }
}
