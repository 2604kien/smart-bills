import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserOweService } from './user-owe.service';
import { UserOweDto } from './dto/user-owe.dto';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';

@Controller('user-owe')
export class UserOweController {
    constructor(private userOweService:UserOweService){}
    @Get()
    @Roles(Role.admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllUserOwe(){
        return this.userOweService.getAllUserOwe();
    }
    @Get(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getUserOweById(@Param('id') id:number){
        return this.userOweService.getUserOweById(id);
    }
    @Post()
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    async createNewUserOwe (@Body() data:UserOweDto){
        return this.userOweService.createNewUserOwe(data);
    }
    @Patch(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    async updateUserOwe(@Param('id') id:number, @Body() data:UserOweDto){
        return this.userOweService.updateUserOwe(data, id);
    }
    @Delete(':id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteUserOwe(@Param('id') id:number){
        return this.userOweService.deleteUserOwe(id);
    }
    @Post('get-list')
    @Roles(...Role.all())
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getUserOweList(@Body() data:any){
        return this.userOweService.getUserOweFromList(data);
    }
}
