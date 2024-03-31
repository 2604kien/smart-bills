import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "./user.entity";
import { Bill } from "./bill.entity";

@Entity()
export class User_Owe{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>User, user=>user.oweList)
    user:User;
    @ManyToOne(()=>Bill, bill=>bill.oweList)
    bill:Bill;
    @Column()
    oweAmount:number;
}