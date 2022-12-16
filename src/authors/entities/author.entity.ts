import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'author',
})
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;
}
