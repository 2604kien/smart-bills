import { IsNotEmpty, IsNumber, isNotEmpty } from "class-validator";
import { User_Paid } from "src/entities/user-paid.entity";
import { User } from "src/entities/user.entity";
type UserInvolve={
    isPaid:boolean;
    amount:string;
    userId:number;
    userFullName:string,
    oweId?:number;
    paidId?:number;
}

export class BillDto{
    @IsNotEmpty()
    totalCost:string;
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    description:string;
    @IsNotEmpty()
    @IsNumber()
    numberPeople:number;
    creator:User;
    @IsNotEmpty()
    userList: UserInvolve[];

}
export class UpdateBillDto{
    creator:User
}
export class BillListDto{
    @IsNotEmpty()
    currList:{id:number}[]
}
