import { Controller, Get, Param } from '@nestjs/common';
import { UserPaidService } from './user-paid.service';

@Controller('user-paid')
export class UserPaidController {
    constructor(private readonly userPaidService:UserPaidService){}
    @Get()
    getAll(){
        return this.userPaidService.getAll();
    }
    @Get(':id')
    getUserPaidById(@Param() id:number){
        return this.userPaidService.getUserPaidById(id);
    }
}
