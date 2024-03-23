import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    async getAllUser(){
        return this.userService.getAllUser();
    }
    @Post()
    async createNewUser(@Body() user:UserDto){
        return this.userService.createNewUser(user);
    }
}
