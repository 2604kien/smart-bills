import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateUserOwe(@Param('id') id:number, @Body() data:UserOweDto){
        return this.userOweService.updateUserOwe(data, id);
    }
    @Delete(':id')
    async deleteUserOwe(@Param('id') id:number){
        return this.userOweService.deleteUserOwe(id);
    }
}
