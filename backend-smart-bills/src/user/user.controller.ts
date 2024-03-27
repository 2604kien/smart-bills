import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserUpdateDto } from './dto/user.dto';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    async getAllUser(){
        return this.userService.getAllUser();
    }
    @Get(':id')
    async getuserById(@Param('id') id:number){
        return this.userService.getOneUser(id);
    }
    @Post()
    @UsePipes(new ValidationPipe())
    async createNewUser(@Body() user:UserDto){
        return this.userService.createNewUser(user);
    }
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id:number, @Body() user:UserUpdateDto){
        return this.userService.updateUser(user, id);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id:number){
        return this.userService.deleteUser(id);
    }
}
