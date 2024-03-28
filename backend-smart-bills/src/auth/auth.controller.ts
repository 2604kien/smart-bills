import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guards';
import { RolesGuard } from 'src/guards/role.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req:Request){
        return req.user;
    }
    
    @Get('test')
    @Roles(Role.admin, Role.user)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async test(@Req() req:Request){
        return req.user;
    }
}
