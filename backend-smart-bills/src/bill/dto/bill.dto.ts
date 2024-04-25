import { IsNotEmpty, IsNumber, isNotEmpty } from "class-validator";
import { User_Paid } from "src/entities/user-paid.entity";
import { User } from "src/entities/user.entity";
type UserInvolve={
    isPaid:boolean;
    amount:number;
    userId:number;
    userFullName:string
}

export class BillDto{
    @IsNotEmpty()
    @IsNumber()
    totalCost:number;
    @IsNotEmpty()
    title:string;
    description:string;
    @IsNotEmpty()
    @IsNumber()
    numberPeople:number;
    @IsNotEmpty()
    creator:User;
    @IsNotEmpty()
    userList: UserInvolve[];

}
export class UpdateBillDto{
    @IsNotEmpty()
    creator:User
}
