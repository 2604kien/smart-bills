import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User_Paid } from 'src/entities/user-paid.entity';
import { UserPaidDto } from './dto/user-paid.dto';
import { UserOweListDto } from 'src/user-owe/dto/user-owe.dto';
@Injectable()
export class UserPaidService {
    constructor(@InjectRepository(User_Paid) private readonly userPaidRepository:Repository<User_Paid>){}

    //get all User_Paid
    async getAll(){
        const data=await this.userPaidRepository.find({
            select:{
                user:{
                    id:true,
                    fullName:true,
                },
                bill:{
                    id:true,
                    date:true,
                    totalCost:true
                }
            },
            relations:{
                user:true,
                bill:true
            }
        });
        return {message:"All User_Paid data are retrieved successfully", data}
    }
    //get one User_Paid by id
    async getUserPaidById(id:number){
        const data=await this.userPaidRepository.findOne({
            where:{id},
            select:{
                id:true,
                user:{
                    id:true,
                    fullName:true
                },
                bill:{
                    id:true,
                    date:true,
                    totalCost:true,
                }
            },
            relations:{
                user:true,
                bill:true
            }
        });
        if(!data){
            throw new HttpException(`User_Paid with the id ${id} is not found.`, HttpStatus.NOT_FOUND);
        }
        return {message:`User_Paid with the id ${id} is retrieved successfully`, data}
    }
    //create User_Paid
    async createUserPaid(data:UserPaidDto){
        const foundedUserPaid=await this.userPaidRepository.findOneBy({user:{id:data.user.id}, bill:{id:data.bill.id}})
        if(foundedUserPaid){
            throw new HttpException('This user_paid is already created.',HttpStatus.CONFLICT);
        }
        try{
            const newUserPaid= new User_Paid();
            newUserPaid.bill=data.bill;
            newUserPaid.user=data.user;
            newUserPaid.paidAmount=data.paidAmount;
            await this.userPaidRepository.save(newUserPaid);
            return {message:"A new user_paid is created.", data:newUserPaid}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //update User_Paid
    async updateUserPaid(data:UserPaidDto, id:number){
        const foundedUserPaid=await this.userPaidRepository.findOneBy({id});
        if(!foundedUserPaid){
            throw new HttpException(`User_Paid with the id ${id} is not found.`, HttpStatus.NOT_FOUND);
        }
        try{
            await this.userPaidRepository.update(id, data);
            return {message:`User_Paid with the id ${id} is updated successfully`, foundedUserPaid}
        }
        catch (error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    //delete User_Paid
    async deleteUserPaid(id:number){
        if(!id){
            throw new HttpException('All field are required', HttpStatus.NO_CONTENT);
        }
        const foundedUserPaid=await this.userPaidRepository.findOneBy({id});
        if(!foundedUserPaid){
            throw new HttpException(`User_Paid with the id ${id} is not found.`, HttpStatus.NOT_FOUND);
        }
        await this.userPaidRepository.delete(id);
        return {message:`User_Paid with the id ${id} is deleted successfully`}
    }
    async getPaidBillFromList(data:UserOweListDto){
        if(data.currList?.length>0 && data.currList){
            
            const foundedList=await Promise.all(data.currList.map(async (el:{id:number})=>{
                const result= await this.userPaidRepository.findOne({
                    where:{id:el.id},
                    select:{
                        user:{
                            id:true,
                            fullName:true
                        },
                        bill:{
                            id:true,
                            date:true,
                            totalCost:true,
                            title:true,
                            creator:{
                                fullName:true
                            }
                        }
                    },
                    relations:{
                        user:true,
                        bill:{
                            creator:true
                        }
                    }
                });
               return result;
            }));
            return {message:`All User_Owe from the provided list are retrieved`, data:foundedList}
        }
        else{
            return {message:`Please provide the Owe List`}
        }
    }
}
