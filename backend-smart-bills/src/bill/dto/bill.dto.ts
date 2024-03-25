import { IsNotEmpty, IsNumber } from "class-validator";

export class BillDto{
    @IsNotEmpty()
    @IsNumber()
    totalCost:number;
    @IsNotEmpty()
    @IsNumber()
    numberPeople:number;
}