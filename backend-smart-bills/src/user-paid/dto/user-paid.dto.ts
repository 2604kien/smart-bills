import { IsNotEmpty } from "class-validator";
import { Bill } from "src/entities/bill.entity";
import { User } from "src/entities/user.entity";

export class UserPaid{
    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    bill:Bill;
}
export class EditUserPaid{
    @IsNotEmpty()
    user:User;
    @IsNotEmpty()
    bill:Bill;
    @IsNotEmpty()
    date:Date;
}