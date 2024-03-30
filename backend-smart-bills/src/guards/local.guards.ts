import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class LocalGuard extends AuthGuard('local'){
    async canActivate(context: ExecutionContext): Promise<any>{
        const result=(await super.canActivate(context)) as boolean;
        const request=context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;        
    }
}