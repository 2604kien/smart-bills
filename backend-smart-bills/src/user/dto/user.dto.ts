import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class UserDto{
    @IsNotEmpty()
    @IsString()
    fullName:string;
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
}
export class UserUpdateDto{
    @IsNotEmpty()
    @IsString()
    fullName:string;
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsNotEmpty()
    @IsNumber()
    balance:number;
}