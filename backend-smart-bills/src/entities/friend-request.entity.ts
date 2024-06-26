import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDetail } from './userdetail.entity';
@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserDetail, (user) => user.friendRequestList, {
    onDelete: 'CASCADE',
  })
  sender: UserDetail;
  @ManyToOne(() => UserDetail, (user) => user.pendingRequestList, {
    onDelete: 'CASCADE',
  })
  receiver: UserDetail;
  @Column({ default: 'pending' })
  status: string;
}
