import { IsNotEmpty, IsString } from "class-validator";
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