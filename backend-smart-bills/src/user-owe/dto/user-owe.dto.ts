import { IsNotEmpty, IsNumber } from "class-validator";
import { Bill } from "src/entities/bill.entity";
import { User } from "src/entities/user.entity";
export class UserOwe{
    @IsNotEmpty()
    @IsNumber()
    oweAmount:number;
    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    bill:Bill;
}
export class EditUserOwe{
    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    bill:Bill;
    @IsNotEmpty()
    date:Date;
    @IsNotEmpty()
    @IsNumber()
    oweAmount:number;
}