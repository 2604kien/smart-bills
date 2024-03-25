import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillDto } from './dto/bill.dto';

@Controller('bill')
export class BillController {
    constructor(private billService:BillService){}
    @Get()
    async getAllBill(){
        return this.billService.getAllBill();
    }
    @Get(':id')
    async getBillById(@Param('id') id:number){
        return this.billService.getOneBill(id);
    }
    @Post()
    async createNewBill(@Body() bill:BillDto){
        return this.billService.createNewBill(bill);
    }
    @Put(':id')
    async updateBill(@Param('id') id:number, @Body() bill:BillDto){
        return this.billService.updateBill(bill, id);
    }
}
