import { IsNotEmpty } from "class-validator";
import { Bill } from "src/entities/bill.entity";
import { User } from "src/entities/user.entity";

export class UserPaidDto{
    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    bill:Bill;
    @IsNotEmpty()
    paidAmount:number;
}