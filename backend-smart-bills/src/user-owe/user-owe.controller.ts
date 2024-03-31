import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserOweService } from './user-owe.service';
import { UserOweDto } from './dto/user-owe.dto';

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
    @Post()
    @UsePipes(new ValidationPipe())
    async createNewUserOwe (@Body() data:UserOweDto){
        return this.userOweService.createNewUserOwe(data);
    }
}
