import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Bill } from "./bill.entity";

@Entity()
export class User_Owe{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>User, user=>user.oweList)
    @JoinColumn()
    user:User
    @ManyToOne(()=>Bill, bill=>bill.oweList)
    @JoinColumn()
    bill:Bill
}