import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bill } from 'src/entities/bill.entity';
import { BillDto } from './dto/bill.dto';
@Injectable()
export class BillService {
    constructor(@InjectRepository(Bill) private billRepository:Repository<Bill>){}

    //get all bill
    async getAllBill():Promise<Object>{
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
    async getOneBill(id:number):Promise<Object>{
        if(!id){
            throw new HttpException('Please provide id.', HttpStatus.OK);
        }
        const bill=await this.billRepository.findOneBy({id});
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
        if(!bill.totalCost || !bill.numberPeople){
            throw new HttpException('All field are required.', HttpStatus.OK);
        }
        try{
            const newBill= new Bill();
            newBill.totalCost=bill.totalCost;
            newBill.numberPeople=bill.numberPeople;
            await this.billRepository.save(newBill);
            return {message:"A new bill is added", data:newBill}
        }
        catch(error){
            console.log(error)
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //update bill and need to modify later for proper handling
    async updateBill(bill:BillDto, id:number):Promise<Object>{
        if(!bill.numberPeople || !bill.totalCost){
            throw new HttpException('All field are required.', HttpStatus.OK);
        }
        const foundedBill=await this.billRepository.findOneBy({id});
        if(!foundedBill){
            throw new HttpException('Bill id is not found', HttpStatus.NOT_FOUND);
        }
        try{
            await this.billRepository.update(id, bill);
            return {message:'Bill data is successfully editted', data:bill}
        }
        catch(error){
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
}
