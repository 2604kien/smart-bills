import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const data = await this.authService.login({username, password});
        if (!data) {
          throw new UnauthorizedException();
        }
        return data;
    }
}