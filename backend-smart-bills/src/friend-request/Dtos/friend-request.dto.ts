import { IsNotEmpty } from "class-validator";
import { UserDetail } from "src/entities/userdetail.entity";

export class FriendRequestDto{
    @IsNotEmpty()
    sender:UserDetail;
    @IsNotEmpty()
    receiver:UserDetail;
}