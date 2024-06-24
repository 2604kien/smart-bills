import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { UserDetail } from './userdetail.entity';
import { Bill } from './bill.entity';

@Entity()
@Unique(['user', 'bill']) // Composite unique constraint
export class User_Owe {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserDetail, (user) => user.oweList, { onDelete: 'CASCADE' })
  user: UserDetail;
  @ManyToOne(() => Bill, (bill) => bill.oweList, { onDelete: 'CASCADE' })
  bill: Bill;
  @Column({ nullable: true })
  oweAmount: string;
}
