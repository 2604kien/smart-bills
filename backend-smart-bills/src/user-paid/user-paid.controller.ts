import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserPaidService } from './user-paid.service';
import { UserPaidDto } from './dto/user-paid.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { UserOweListDto } from 'src/user-owe/dto/user-owe.dto';

@Controller('user-paid')
export class UserPaidController {
  constructor(private readonly userPaidService: UserPaidService) {}
  @Get()
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAll() {
    return this.userPaidService.getAll();
  }
  @Get(':id')
  @Roles(...Role.all())
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUserPaidById(@Param('id') id: number) {
    return this.userPaidService.getUserPaidById(id);
  }
  @Post()
  @Roles(...Role.all())
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  createNewUserPaid(@Body() data: UserPaidDto) {
    return this.userPaidService.createUserPaid(data);
  }
  @Patch(':id')
  @Roles(...Role.all())
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: number, @Body() data: UserPaidDto) {
    return this.userPaidService.updateUserPaid(data, id);
  }
  @Delete(':id')
  @Roles(...Role.all())
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteUser(@Param('id') id: number) {
    return this.userPaidService.deleteUserPaid(id);
  }
  @Post('get-list')
  @Roles(...Role.all())
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  getPaidUserFromList(@Body() data: UserOweListDto) {
    return this.userPaidService.getPaidBillFromList(data);
  }
}
