import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { AuthDto } from './dto/auth.dto';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    
    async login(data:AuthDto, response:Response){
        
    }
}
