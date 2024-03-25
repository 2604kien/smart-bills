import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User_Owe } from 'src/entities/user-owe.entity';
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
            return {message: "A row data in User_Owe table is retrieved", data:foundedData};
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
