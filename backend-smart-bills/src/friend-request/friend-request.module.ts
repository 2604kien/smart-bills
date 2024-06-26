import { Module } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { UserDetail } from 'src/entities/userdetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest, UserDetail])],
  providers: [FriendRequestService],
  controllers: [FriendRequestController],
})
export class FriendRequestModule {}
