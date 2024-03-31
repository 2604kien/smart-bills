import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_Owe } from 'src/entities/user-owe.entity';
import { UserOweDto } from './dto/user-owe.dto';
@Injectable()
export class UserOweService {
    constructor(@InjectRepository(User_Owe) private userOweRepository:Repository<User_Owe>){}
    //get all data from User_Owe table
    async getAllUserOwe():Promise<Object>{
        try{
            const data=await this.userOweRepository.find();
            return {message: "All data from User_Owe table is retrieved.", data:data}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //get one row from User_Owe table by id
    async getUserOweById(id:number):Promise<Object>{
        if(!id){
            throw new HttpException('Please provide valid id.', HttpStatus.OK);
        }
        const foundedData=await this.userOweRepository.findOneBy({id});
        if(!foundedData){
            throw new HttpException('The id provided is not found.', HttpStatus.NOT_FOUND);
        }
        try{
            return {message: `User_Owe with id ${id} is retrieved successfully.`, data:foundedData};
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //add new User_Owe
    async createNewUserOwe(data:UserOweDto){
        const foundedUserOwe=await this.userOweRepository.findOneBy({user:{id:data.user.id}, bill:{id:data.bill.id}});
        if(foundedUserOwe){
            throw new HttpException('This user_owe is already added', HttpStatus.CONFLICT);
        }
        try{
            const newUserOwe=new User_Owe();
            newUserOwe.user=data.user;
            newUserOwe.bill=data.bill;
            newUserOwe.oweAmount=data.oweAmount;
            await this.userOweRepository.save(newUserOwe);
            return {message:"New User_Owe is successfully created", data: newUserOwe};
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //delete user_owe
    async deleteUserOwe(id:number){
        const foundedUserOwe=await this.userOweRepository.findOneBy({id});
        if(!foundedUserOwe){
            throw new HttpException(`User_Owe with the id ${id} is not found`, HttpStatus.NOT_FOUND)
        }
        await this.userOweRepository.delete(id);
        return {message:`User_Owe with the id ${id} is deleted successfully`}
    }
    //edit user_owe
    async updateUserOwe(data:UserOweDto, id:number){
        const foundedUserOwe=await this.userOweRepository.findOneBy({id});
        if(!foundedUserOwe){
            throw new HttpException(`User_Owe with the id ${id} is not found`, HttpStatus.NOT_FOUND)
        }
        foundedUserOwe.user=data.user;
        foundedUserOwe.bill=data.bill;
        foundedUserOwe.oweAmount=data.oweAmount;
        await this.userOweRepository.save(foundedUserOwe);
        return {message:`User_Owe with the id ${id} is updated successfully`}
    }
}
