import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from 'src/entities/bill.entity';
import { BillDto, BillListDto} from './dto/bill.dto';
import { UserOweService } from 'src/user-owe/user-owe.service';
import { UserPaidService } from 'src/user-paid/user-paid.service';
import { UserDetail } from 'src/entities/userdetail.entity';
import { User_Owe } from 'src/entities/user-owe.entity';
import { User_Paid } from 'src/entities/user-paid.entity';
@Injectable()
export class BillService {
    
    constructor(
        @InjectRepository(Bill) private billRepository:Repository<Bill>,
        @Inject(UserOweService) private userOweService:UserOweService,
        @Inject(UserPaidService) private userPaidService:UserPaidService,
        @InjectRepository(User_Owe) private userOweRepository:Repository<User_Owe>,
        @InjectRepository(User_Paid) private userPaidRepository:Repository<User_Paid>
    ){}

    //get all bill
    async getAllBill():Promise<Object>{
        try{
            const data=await this.billRepository.find({
                select:{
                    creator:{
                        id:true,
                        fullName:true
                    }
                },
                relations:{creator:true}
            });
            return {message: "All bill data are retrieved", data:data}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something wrong, please try again at later time', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //get one bill by id
    async getOneBill(id:number):Promise<Object>{
        if(!id){
            throw new HttpException('Please provide id.', HttpStatus.OK);
        }
        const bill=await this.billRepository.findOne({
            where:{id},
            select:{
                id:true,
                title:true,
                description:true,
                numberPeople:true,
                totalCost:true,
                date:true,
                oweList:{
                    id:true,
                    user:{
                        id:true,
                        fullName:true,
                    },
                    oweAmount:true
                },
                paidList:{
                    id:true,
                    user:{
                        id:true,
                        fullName:true
                    },
                    paidAmount:true
                }
            },
            relations:{
                oweList:{user:true},
                paidList:{user:true}
            }
        });
        if(!bill){
            throw new HttpException('The id provided is not found.', HttpStatus.NOT_FOUND);
        }
        try{
            return {message: "Bill data is retrieved", data:bill};
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something wrong, please try again at later time', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //create new bill
    async createNewBill(bill:BillDto):Promise<Object>{
        try{
            //create bill
            const newBill= new Bill();
            newBill.totalCost=bill.totalCost;
            newBill.numberPeople=bill.numberPeople;
            newBill.creator=bill.creator;
            newBill.title=bill.title;
            newBill.description=bill.description || ""
            const savedBill= await this.billRepository.save(newBill);
            //create user-owe
            const userOweList=bill.userList.filter(el=>el.isPaid===false);
            if(userOweList){
                userOweList.map(async (el)=>{
                const user=new UserDetail();
                user.id=el.userId;
                const data={
                    bill:savedBill,
                    user:user,
                    oweAmount: el.amount
                }
                await this.userOweService.createNewUserOwe(data);
                return el;
            })
            }
            //create user-paid

            const userPaidList=bill.userList.filter(el=>el.isPaid===true);
            if(userPaidList){
                userPaidList.map(async (el)=>{
                    const user=new UserDetail();
                    user.id=el.userId;
                    const data={
                        bill:savedBill,
                        user:user,
                        paidAmount:el.amount
                    }
                    await this.userPaidService.createUserPaid(data);
                    return el;
                })
                return {message:"A new bill is added", data:newBill}
            }
        }
        catch(error){
            console.log(error)
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //update bill and need to modify later for proper handling
async updateBill(bill: BillDto, id: number): Promise<Object> {
    const foundedBill = await this.billRepository.findOne({
        where:{id},
        select:{
            id:true,
            title:true,
            description:true,
            numberPeople:true,
            totalCost:true,
            date:true,
            oweList:{
                id:true,
                user:{
                    id:true,
                    fullName:true,
                },
                bill:{
                    id:true
                },
                oweAmount:true
            },
            paidList:{
                id:true,
                user:{
                    id:true,
                    fullName:true
                },
                bill:{
                    id:true,
                },
                paidAmount:true
            }
        },
        relations:{
            oweList:{user:true, bill: true},
            paidList:{user:true, bill:true}
        }
    });
    if (!foundedBill) {
        throw new HttpException('Bill id is not found', HttpStatus.NOT_FOUND);
    }

    try {
        foundedBill.totalCost = bill.totalCost;
        foundedBill.numberPeople = bill.numberPeople;
        foundedBill.creator = bill.creator;
        foundedBill.title = bill.title;
        foundedBill.description = bill.description || "";
        const savedBill = await this.billRepository.save(foundedBill);
        //initialise userPaidList and user Owe List
        const userPaidList = bill.userList.filter(el => el.isPaid === true);
        const userOweList = bill.userList.filter(el => el.isPaid === false);

        //remove item.
        await Promise.all(foundedBill.paidList.map(async (el:User_Paid)=>{
            const found=userPaidList.find(e=>Number(e.userId)===Number(el.user.id) && Number(el.bill.id)===Number(id))
            if(!found) await this.userPaidService.deleteUserPaid(el.id);
        }));
        await Promise.all(foundedBill.oweList.map(async (el:User_Owe)=>{
            const found=userOweList.find(e=>Number(e.userId)===Number(el.user.id) && Number(el.bill.id)===Number(id))
            if(!found) await this.userOweService.deleteUserOwe(el.id);
        }));

         // Create user-paid or modify user-paid
         const userPaidPromises = await Promise.all(userPaidList.map(async (el: any) => {
             let foundeduserPaid = await this.userPaidRepository.findOne({
                 where:{
                     user:{id:Number(el.userId)},
                     bill:{id:id}
                 },
                 relations:{
                     user:true,
                     bill:true
                 }
             });
             if (!foundeduserPaid) {
                const user=new UserDetail();
                user.id=el.userId;
                const data={
                    bill:savedBill,
                    user:user,
                    paidAmount:el.amount
                }
                return await this.userPaidService.createUserPaid(data);
             } else{
                const user = new UserDetail();
                user.id = el.userId;
                foundeduserPaid.bill = savedBill;
                foundeduserPaid.user = user;
                foundeduserPaid.paidAmount = el.amount;
                return this.userPaidRepository.save(foundeduserPaid);
             }

         }));
 
        // Create user-owe or modify user-owe
        const userOwePromises =await Promise.all(userOweList.map(async (el: any) => {
            let foundedUserOwe = await this.userOweRepository.findOne({
                where:{
                    user:{id:Number(el.userId)},
                    bill:{id:id}
                },
                relations:{
                    user:true,
                    bill:true
                }
            });

            if (!foundedUserOwe) {
                const user=new UserDetail();
                user.id=el.userId;
                const data={
                    bill:savedBill,
                    user:user,
                    oweAmount: el.amount
                }
                return await this.userOweService.createNewUserOwe(data);
            } else{
                const user = new UserDetail();
                user.id = el.userId;
                foundedUserOwe.bill = savedBill;
                foundedUserOwe.user = user;
                foundedUserOwe.oweAmount = el.amount;
                return this.userOweRepository.save(foundedUserOwe);
            }
        }));
        return { message: "Bill updated successfully", data: foundedBill };

    } catch (error) {
        console.log(error);
        throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
    //delete bill by id
    async deleteBill(id:number):Promise<Object>{
        if(!id){
           throw new HttpException('Please provide valid id.', HttpStatus.OK)
        }
        const foundedBill=await this.billRepository.findOneBy({id});
        if(!foundedBill){
            throw new HttpException('Bill with provided id is not found.', HttpStatus.NOT_FOUND);
        }
        try{
            await this.billRepository.delete(id);
            return {message:"Bill is deleted successfully"}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //delete all bill data
    async deleteAll(){
        await this.billRepository.delete({});
        return {message:"All Bill Deleted"};
    }
    //get bill detail from list
    async getBillList(data:BillListDto){
        const foundedList=await Promise.all(data.currList.map(async (el:{id:number})=>{
            const result=await this.billRepository.findOne({
                where:{id:el.id},
                select:{
                    id:true,
                    creator:{
                        id:true,
                        fullName:true
                    },
                    title:true,
                    description:true,
                    numberPeople:true,
                    totalCost:true,
                    date:true,
                },
                order:{
                    date:'DESC'
                },
                relations:{creator:true}
            });
            return result;
        }));
        return {message:`All Bill from the provided list are retrieved`, data:foundedList}
    }
}
