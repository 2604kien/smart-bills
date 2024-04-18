import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestDto } from './Dtos/friend-request.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/role.enum';

@Controller('friend-request')
export class FriendRequestController {
    constructor(private friendRequestService:FriendRequestService){}
    @Get()
    getAllRequest(){
        return this.friendRequestService.getAll();
    }
    @Get(':id')
    getById(@Param('id') id:number){
        return this.friendRequestService.getById(id);
    }
    @Post()
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    addFriendRequest(@Body() data:FriendRequestDto){
        return this.friendRequestService.addFriendRequest(data);
    }
    @Delete('reject/:id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    deleteRequestById(@Param('id') id:number){
        return this.friendRequestService.deleteFriendRequestReject(id);
    }
    @Get('accept/:id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    acceptRequest(@Param('id') id:number){
        return this.friendRequestService.acceptFriendRequest(id);    
    }
    @Get('friend-list/:id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    getFriendList(@Param('id') senderId:number){
        return this.friendRequestService.getFriendList(senderId);
    }
    @Get('request-list/:id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    getFriendRequestList(@Param('id') id:number){
        return this.friendRequestService.getFriendRequestList(id);
    }
    @Get('pending-list/:id')
    @Roles(...Role.all())
    @UseGuards(JwtAuthGuard, RolesGuard)
    getPendingList(@Param('id') id:number){
        return this.friendRequestService.getPendingRequestList(id);
    }
}
