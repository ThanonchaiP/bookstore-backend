import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm';

@Entity({
  name: 'banner',
})
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column({ nullable: true })
  link: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  image: string;

  @AfterLoad()
  getUrl(): void {
    this.image = `${process.env.URL}/images/banner/${this.image}`;
  }
}
