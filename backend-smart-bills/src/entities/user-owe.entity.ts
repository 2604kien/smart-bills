import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "./user.entity";
import { Bill } from "./bill.entity";

@Entity()
export class User_Owe{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>User, user=>user.oweList, {onDelete:'CASCADE'})
    user:User;
    @ManyToOne(()=>Bill, bill=>bill.oweList, {onDelete:'CASCADE'})
    bill:Bill;
    @Column()
    oweAmount:string;
}