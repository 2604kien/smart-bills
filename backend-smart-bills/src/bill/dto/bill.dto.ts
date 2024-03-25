import { IsNotEmpty, IsNumber } from "class-validator";
import { User_Paid } from "src/entities/user-paid.entity";

export class BillDto{
    @IsNotEmpty()
    @IsNumber()
    totalCost:number;
    @IsNotEmpty()
    @IsNumber()
    numberPeople:number;
}
