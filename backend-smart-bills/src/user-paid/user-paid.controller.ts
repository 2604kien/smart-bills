import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserPaidService } from './user-paid.service';
import { UserPaidDto } from './dto/user-paid.dto';

@Controller('user-paid')
export class UserPaidController {
    constructor(private readonly userPaidService:UserPaidService){}
    @Get()
    getAll(){
        return this.userPaidService.getAll();
    }
    @Get(':id')
    getUserPaidById(@Param('id') id:number){
        return this.userPaidService.getUserPaidById(id);
    }
    @Post()
    @UsePipes(new ValidationPipe())
    createNewUserPaid(@Body() data:UserPaidDto){
        return this.userPaidService.createUserPaid(data);
    }
    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateUser(@Param('id') id:number,@Body() data:UserPaidDto){
        return this.userPaidService.updateUserPaid(data, id);
    }
    @Delete(':id')
    deleteUser(@Param('id') id:number){
        return this.userPaidService.deleteUserPaid(id);
    }
}
