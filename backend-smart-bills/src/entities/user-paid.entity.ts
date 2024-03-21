import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Bill } from "./bill.entity";

@Entity()
export class User_Paid{
    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(()=>User, user=>user.paidList)
    @JoinColumn()
    user:User
    @ManyToOne(()=>Bill, bill=>bill.paidList)
    @JoinColumn()
    bill:Bill
}