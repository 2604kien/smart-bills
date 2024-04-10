import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User } from "./user.entity";
@Entity()
export class FriendRequest{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>User, user=>user.friendRequestList)
    sender:User;
    @ManyToOne(()=>User, user=>user.pendingRequestList)
    receiver:User;
}