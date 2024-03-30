import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
    @UseGuards(AuthenticationAuthGuard, RolesGuard)
    @Roles(Role.admin, Role.user)
    @Get('test')
    async test(@Req() req:Request){
        return req.user;
    }
}
