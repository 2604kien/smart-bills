import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('login')
    async login(@Body() data:AuthDto){
        return this.authService.login(data);
    }
}
