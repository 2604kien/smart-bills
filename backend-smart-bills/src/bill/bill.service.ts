import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from 'src/entities/bill.entity';
@Injectable()
export class BillService {
    constructor(@InjectRepository(Bill) private billRepository:Repository<Bill>){}

    //get all bill
    async getAllBill(){
        try{
            const data=await this.billRepository.find();
            return {message: "All bill data are retrieved", data:data}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something wrong, please try again at later time', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //get one bill by id
    async getOneBill(id:number){
        if(!id){
            throw new HttpException('Please provide id.', HttpStatus.OK);
        }
        try{
            const bill=await this.billRepository.findOneBy({id});
            return {message: "Bill data is retrieved", data:bill};
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something wrong, please try again at later time', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //create new bill
    
}
