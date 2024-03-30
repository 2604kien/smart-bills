import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
@Injectable()
export class SessionSerializer extends PassportSerializer{
    serializeUser(user: any, done: Function) {
        console.log("serializer data: "+user);
        done(null, user);
    }
    deserializeUser(payload: any, done: Function) {
        console.log("deserializer data: "+payload);
        done(null, payload);
    }
}