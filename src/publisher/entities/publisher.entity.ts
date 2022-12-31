import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({
  name: 'publisher',
})
export class Publisher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
