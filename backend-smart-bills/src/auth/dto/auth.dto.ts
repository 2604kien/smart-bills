import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string;
    @IsBoolean()
    remember?:boolean;
}