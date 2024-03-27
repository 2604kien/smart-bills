import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
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
    @IsNotEmpty()
    @IsEmail()
    email:string;
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
    @IsEmail()
    email:string;
    @IsNotEmpty()
    @IsNumber()
    balance:number;
}