import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Paid } from 'src/entities/user-paid.entity';
import { UserPaidDto } from './dto/user-paid.dto';
@Injectable()
export class UserPaidService {
    constructor(@InjectRepository(User_Paid) private readonly userPaidRepository:Repository<User_Paid>){}

    //get all User_Paid
    async getAll(){
        const data=await this.userPaidRepository.find();
        return {message:"All User_Paid data are retrieved successfully", data}
    }
    //get one User_Paid by id
    async getUserPaidById(id:number){
        const data=await this.userPaidRepository.findOneBy({id});
        return {message:`User_Paid with the id ${id} is retrieved successfully`, data}
    }
}
