import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private jwtService:JwtService,
        @InjectRepository(User) private userRepository:Repository<User>
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
                try{
                    const jwt= await this.jwtService.signAsync({UserInfo:{id:foundedUser.id, username:foundedUser.username, role:foundedUser.role}})
                    return {message: "You are login successfully.", data:jwt}
                }
                catch(error){
                    console.log(error);
                    throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else{
                throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
            }
    }

    
}
