import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, Unique } from "typeorm";
import { UserDetail } from "./userdetail.entity";
import { Bill } from "./bill.entity";

@Entity()
@Unique(['user', 'bill']) // Composite unique constraint
export class User_Paid{
    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn()
    date: Date;
    @Column({nullable:true})
    paidAmount:string;
    @ManyToOne(()=>UserDetail, user=>user.paidList, {onDelete:'CASCADE'})
    user:UserDetail
    @ManyToOne(()=>Bill, bill=>bill.paidList, {onDelete:'CASCADE'})
    bill:Bill
}