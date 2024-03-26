import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User_Owe } from "./user-owe.entity";
import { User_Paid } from "./user-paid.entity";

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
    @Column({default:0})
    balance: number;
    @Column({default:"user"})
    role:string;
    @OneToMany(()=>User_Owe, user_owe=>user_owe.user)
    oweList: User_Owe[]
    @OneToMany(()=>User_Paid, user_paid=>user_paid.user)
    paidList: User_Paid[]

}