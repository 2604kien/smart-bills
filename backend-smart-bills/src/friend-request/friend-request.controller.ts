import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestDto } from './Dtos/friend-request.dto';

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
    addFriendRequest(@Body() data:FriendRequestDto){
        return this.friendRequestService.addFriendRequest(data);
    }
    @Delete('reject/:id')
    deleteRequestById(@Param('id') id:number){
        return this.friendRequestService.deleteFriendRequestReject(id);
    }
    @Delete('accept/:id')
    deleteRequestByIdAccept(@Param('id') id:number){
        return this.friendRequestService.deleteFriendRequestAccept(id);
    }
}
