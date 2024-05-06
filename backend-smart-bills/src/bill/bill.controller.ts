import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillDto,BillListDto,UpdateBillDto } from './dto/bill.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('bill')
export class BillController {
    constructor(private billService:BillService){}
    @Get()
    @Roles(Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllBill(){
        return this.billService.getAllBill();
    }
    @Get(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getBillById(@Param('id') id:number){
        return this.billService.getOneBill(id);
    }
    @Post()
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    async createNewBill(@Body() bill:BillDto){
        return this.billService.createNewBill(bill);
    }
    @Patch(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    async updateBill(@Param('id') id:number, @Body() bill:BillDto){
        return this.billService.updateBill(bill, id);
    }
    @Delete('all')
    @Roles(Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteAll(){
        return this.billService.deleteAll();
    }
    @Delete(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteBill(@Param('id') id:number){
        return this.billService.deleteBill(id);
    }
    @Post('get-list')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getBillList(@Body() data:BillListDto ){
        return this.billService.getBillList(data)
    }
}
