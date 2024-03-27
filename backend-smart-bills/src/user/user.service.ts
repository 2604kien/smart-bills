import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    //get all user from the database
    async getAllUser():Promise<User[]>{
        return this.userRepository.find();
    }
    //get one user by id
    async getOneUser(id:number):Promise<Object>{
        const user=await this.userRepository.findOneBy({id});
        if(!user){
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }
        try{
            delete user.password;
            return {message: "User data is retrieved.", data: user};
        }
        catch(error){
            console.log(error)
            throw new HttpException('Internal Sever Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //create new user 
    async createNewUser(user:UserDto):Promise<Object>{

         const existUser=await this.userRepository.findOne({
            where:{
                username:user.username,
            }
        });
        if (existUser){
            throw new HttpException(`User ${user.username} is already created.`, HttpStatus.CONFLICT);
        }
        try {
            const newUser= new User();
            newUser.fullName=user.fullName;
            newUser.username=user.username;
            newUser.password= await bcrypt.hash(user.password, 10);
            newUser.email=user.email;
            await this.userRepository.save(newUser);
            return {
                message:"User is created successfully",
                data: newUser
            }
        } catch (error) {
            console.log(error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //update user data
    async updateUser(user:UserUpdateDto, id:number):Promise<Object>{
        const foundedUser= await this.userRepository.findOneBy({id});
        if(!foundedUser){
            throw new HttpException('User is not found.', HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update(id, user);
        return {message: "User data is updated", data:user};
    }
    //delete user by ID
    async deleteUser(id:number):Promise<Object>{
        const foundedUser= await this.userRepository.findOneBy({id});
        if(!foundedUser){
            throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
        }
        try{
            await this.userRepository.delete(id);
            return {message:'User is deleted successfully'}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
