import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async getAllUser():Promise<User[]>{
        return this.userRepository.find();
    }

    async getOneUser(id:number):Promise<User>{
        const user=await this.userRepository.findOneBy({id});
        delete user.password;
        return user;
    }
    async createNewUser(user:UserDto):Promise<Object>{
        try {
            //check if user is exist
            const existUser=await this.userRepository.findOne({
                where:{
                    username:user.username,
                }
            });
            if (existUser){
                return {message: `User ${user.username} is already created.`}
            }
            const newUser= new User();
            newUser.fullName=user.fullName;
            newUser.username=user.username;
            newUser.password= await bcrypt.hash(user.password, 10);
            await this.userRepository.save(newUser);
            return {
                message:"User is created successfully",
                data: newUser
            }
        } catch (error) {
            console.log(error);
            return {message: "Internal Server Error."}
        }
    }
}
