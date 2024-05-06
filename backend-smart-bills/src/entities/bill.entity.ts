import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User_Paid } from "./user-paid.entity";
import { User_Owe } from "./user-owe.entity";
import { User } from "./user.entity";

@Entity()
export class Bill{
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    date: Date;
    @Column()
    title: string;
    @Column({nullable:true})
    description:string;
    @Column()
    totalCost: string;
    @Column()
    numberPeople:number;
    @OneToMany(()=>User_Paid, user_paid=>user_paid.bill)
    paidList: User_Paid[];
    @OneToMany(()=>User_Owe, user_owe=>user_owe.bill)
    oweList:User_Owe[];
    @ManyToOne(()=>User, user=>user.createdBillList, {onDelete:'CASCADE'})
    creator:User;
}