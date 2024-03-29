import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";

export class SessionSerializer extends PassportSerializer{
    constructor(private readonly userService:UserService){
        super();
    }
    serializeUser(payload:any, done: Function) {
        console.log("data serailize: "+JSON.stringify(payload));
        done(null, payload.data);
    }
    async deserializeUser(payload: any, done: Function) {
        console.log("data deserailize: "+JSON.stringify(payload));
        const userDB=await this.userService.getOneUser(payload.UserInfo.id);
        
        return userDB? done(null, userDB):done(null, null);
    }
}