import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalGuard } from '../guards/local.guards';
import { RolesGuard } from 'src/guards/role.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Body() data: AuthDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const accessToken = await this.jwtService.signAsync(
      { UserInfo: req.user },
      {
        expiresIn: '15m',
      },
    );
    // if(data.remember===true){ wait to integrate with session
    const refreshToken = await this.jwtService.signAsync(
      { UserInfo: req.user },
      {
        expiresIn: '7d',
      },
    );
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // }
    res.send({ message: 'You are login successfully', data: accessToken });
  }
  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.refresh(req, res);
  }
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
  @Get('test')
  @Roles(Role.admin, Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async test(@Req() req: Request) {
    return req.user;
  }
}
