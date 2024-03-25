import { Controller, Get, Param } from '@nestjs/common';
import { UserOweService } from './user-owe.service';

@Controller('user-owe')
export class UserOweController {
    constructor(private userOweService:UserOweService){}
    @Get()
    async getAllUserOwe(){
        return this.userOweService.getAllUserOwe();
    }
    @Get(':id')
    async getUserOweById(@Param('id') id:number){
        return this.userOweService.getUserOweById(id);
    }
}
