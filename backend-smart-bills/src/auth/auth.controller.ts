import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { AuthenticationAuthGuard } from 'src/guards/authentication.guard';
import { LocalGuard } from '../guards/local.guards';
import { RolesGuard } from 'src/guards/role.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @UseGuards(LocalGuard)
    @Post('login')
    async login(@Req() req:Request){
        return req.user;
    }
    @Get('logout')
    async logout(@Req() req:Request){
        try{  
            req.logOut(err=>err?console.log(err):{});
        }
        catch(error){
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {message: "You are logout successfully."}
    }
    @UseGuards(AuthenticationAuthGuard, RolesGuard)
    @Roles(Role.admin, Role.user)
    @Get('test')
    async test(@Req() req:Request){
        return req.user;
    }
}
