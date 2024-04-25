import { IsNotEmpty, IsNumber } from "class-validator";
import { Bill } from "src/entities/bill.entity";
import { User } from "src/entities/user.entity";
type OweBill={
    id:number;
}
export class UserOweDto{
    @IsNotEmpty()
    @IsNumber()
    oweAmount:number;
    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    bill:Bill;
    
}
export class UserOweListDto{
    @IsNotEmpty()
    currOweList:OweBill[]
}