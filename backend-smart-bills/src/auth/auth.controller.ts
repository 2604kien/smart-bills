import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req:Request){
        return req.user;
    }
}
