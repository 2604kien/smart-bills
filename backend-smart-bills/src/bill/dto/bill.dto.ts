import { IsNotEmpty, IsNumber } from "class-validator";
import { User_Paid } from "src/entities/user-paid.entity";
import { User } from "src/entities/user.entity";

export class BillDto{
    @IsNotEmpty()
    @IsNumber()
    totalCost:number;
    @IsNotEmpty()
    @IsNumber()
    numberPeople:number;
    @IsNotEmpty()
    user:User;
}
export class UpdateBillDto{
    @IsNotEmpty()
    user:User
}
