import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/user.enum';

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

  @Column()
  image: string;

  @Column({ nullable: true })
  refreshToken: string;
}
