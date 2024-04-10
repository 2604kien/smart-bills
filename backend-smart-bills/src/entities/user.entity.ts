import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { User_Owe } from "./user-owe.entity";
import { User_Paid } from "./user-paid.entity";
import { Bill } from "./bill.entity";
import { FriendRequest } from "./friend-request.entity";

type FriendListType={
    id:number,
    username:string,
    fullName:string,
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    fullName:string;
    @Column({unique:true})
    username:string;
    @Column()
    password: string;
    @Column({unique:true})
    email:string;
    @Column({unique:true})
    phoneNumber:string;
    @Column({default:0})
    balance: number;
    @Column("text", {nullable:true, default:['user'], array:true})
    roles:string[];
    @OneToMany(()=>User_Owe, user_owe=>user_owe.user)
    oweList: User_Owe[]
    @OneToMany(()=>User_Paid, user_paid=>user_paid.user)
    paidList: User_Paid[]
    @OneToMany(()=>Bill, bill=>bill.user)
    billList: Bill[]
    @OneToMany(()=>FriendRequest, friend_request=>friend_request.sender)
    friendRequestList:FriendRequest[];
    @OneToMany(()=>FriendRequest, friend_request=>friend_request.receiver)
    pendingRequestList:FriendRequest[];
}