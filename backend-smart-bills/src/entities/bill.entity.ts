import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from "typeorm";
import { User_Paid } from "./user-paid.entity";
import { User_Owe } from "./user-owe.entity";

@Entity()
export class Bill{
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    date: Date;
    @Column()
    totalCost: number;
    @Column()
    numberPeople:number;
    @OneToMany(()=>User_Paid, user_paid=>user_paid.bill)
    paidList: User_Paid;
    @OneToMany(()=>User_Owe, user_owe=>user_owe.bill)
    oweList:User_Owe;
}