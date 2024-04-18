import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";
@Entity()
export class FriendRequest{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>User, user=>user.friendRequestList, {onDelete:'CASCADE'})
    sender:User;
    @ManyToOne(()=>User, user=>user.pendingRequestList, {onDelete:'CASCADE'})
    receiver:User;
    @Column({default:"pending"})
    status:string
}