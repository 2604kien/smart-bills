import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @UsePipes(new ValidationPipe())
    async createNewBill(@Body() bill:BillDto){
        return this.billService.createNewBill(bill);
    }
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateBill(@Param('id') id:number, @Body() bill:BillDto){
        return this.billService.updateBill(bill, id);
    }
    @Delete(':id')
    async deleteBill(@Param('id') id:number){
        return this.billService.deleteBill(id);
    }
}
