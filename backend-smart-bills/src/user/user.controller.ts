import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Request } from 'express';
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}
    @Get()
    @Roles(Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllUser(){
        return this.userService.getAllUser();
    }
    @Get(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getuserById(@Param('id') id:number){
        return this.userService.getOneUser(id);
    }
    @Post()
    @UsePipes(new ValidationPipe())
    async createNewUser(@Body() user:UserDto){
        return this.userService.createNewUser(user);
    }
    @Patch(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    async updateUser(@Req() req:Request, @Param('id') id:number, @Body() user:UserUpdateDto){
        //remove roles in incomming request if user is not an admin and try to update their roles
        const roles=JSON.parse(JSON.stringify(req.user)).UserInfo.roles;
        if(user?.roles && !roles.includes('admin')){
            delete user.roles;
        }
        return this.userService.updateUser(user, id);
    }
    @Delete(':id')
    @Roles(Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteUser(@Param('id') id:number){
        return this.userService.deleteUser(id);
    }
}
