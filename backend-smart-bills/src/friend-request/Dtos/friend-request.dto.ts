import { IsNotEmpty } from "class-validator";
import { User } from "src/entities/user.entity";

export class FriendRequestDto{
    @IsNotEmpty()
    sender:User;
    @IsNotEmpty()
    receiver:User;
}