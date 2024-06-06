import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDetail } from 'src/entities/userdetail.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService,
        @InjectRepository(UserDetail) private userRepository:Repository<UserDetail>
    ){}
      //login logic
    async login(data:AuthDto):Promise<Object>{
        if(!data.username||!data.password){
            throw new HttpException('All field are required', HttpStatus.OK);
        }
        const foundedUser=await this.userRepository.findOneBy({username:data.username});
        if(!foundedUser){
            throw new HttpException('You need to register before login.', HttpStatus.NOT_FOUND);
        }
            const isAuthenticate=await bcrypt.compare(data.password, foundedUser.password);
            if(isAuthenticate){
                delete foundedUser.password;
                delete foundedUser.fullName;
                delete foundedUser.email;
                delete foundedUser.balance;
                return foundedUser;
            }
    }
    async refresh(req: Request, res:Response):Promise<any>{
        const cookie=req.cookies;
        if(!cookie){
            throw new HttpException('No Content', HttpStatus.NO_CONTENT)
        }
        const payload= await this.jwtService.verifyAsync(cookie.jwt, {
            secret:process.env.SECRET
        });
        const foundedUser= await this.userRepository.findOneBy({id: payload.UserInfo.id});
        if(!foundedUser){
            throw new HttpException('No user found', HttpStatus.UNAUTHORIZED);
        }
        delete foundedUser.password;
        delete foundedUser.fullName;
        delete foundedUser.email;
        delete foundedUser.balance;
        const accessToken=await this.jwtService.signAsync({UserInfo:foundedUser},{
            expiresIn:'15m'
        })
        const refreshToken=await this.jwtService.signAsync({UserInfo:foundedUser},{
            expiresIn:'7d'
        });
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true,
            sameSite:'none',
        })
        res.cookie('jwt',refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge:7*24*60*60*1000
        })
        res.send({accessToken:accessToken});
    }
    async logout(req:Request, res:Response){
        const cookie= req.cookies
        if(!cookie){
            throw new HttpException('No Content', HttpStatus.NO_CONTENT);
        }
        res.clearCookie('jwt', {
            httpOnly:true,
            secure: true,
            sameSite:'none'
        })
        res.send({message:"Cookie is cleared"});
    }
}
