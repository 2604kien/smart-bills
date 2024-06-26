import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { UserDetail } from 'src/entities/userdetail.entity';
import { Repository } from 'typeorm';
import { FriendRequestDto } from './Dtos/friend-request.dto';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(UserDetail)
    private userRepository: Repository<UserDetail>,
  ) {}

  async getAll() {
    return await this.friendRequestRepository.find({
      select: {
        sender: {
          id: true,
          username: true,
        },
        receiver: {
          id: true,
          username: true,
        },
      },
      relations: {
        sender: true,
        receiver: true,
      },
    });
  }
  async getById(id: number) {
    try {
      const foundedRequest = await this.friendRequestRepository.findOne({
        where: { id: id },
        select: {
          sender: {
            id: true,
            username: true,
            fullName: true,
          },
          receiver: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        relations: {
          sender: true,
          receiver: true,
        },
      });
      return {
        message: `Request with id ${id} is retrieved successfully`,
        data: foundedRequest,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something went wrong, please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //Add friend Request
  async addFriendRequest(data: FriendRequestDto) {
    const foundedRequest1 = await this.friendRequestRepository.findOneBy({
      sender: { id: data.sender.id },
      receiver: { id: data.receiver.id },
    });
    const foundedRequest2 = await this.friendRequestRepository.findOneBy({
      sender: { id: data.receiver.id },
      receiver: { id: data.sender.id },
    });
    if (
      foundedRequest1 ||
      foundedRequest2 ||
      data.sender.id === data.receiver.id
    ) {
      throw new HttpException(
        'You already sent friend request to this person.',
        HttpStatus.CONFLICT,
      );
    }
    const foundedReceiver = await this.userRepository.findOneBy({
      id: data.receiver.id,
    });
    if (!foundedReceiver) {
      throw new HttpException(
        'User with this mobile number is not found.',
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      const foundedSender = await this.userRepository.findOneBy({
        id: data.sender.id,
      });
      const foundedReceiver = await this.userRepository.findOneBy({
        id: data.receiver.id,
      });
      const newRequest = new FriendRequest();
      newRequest.sender = foundedSender;
      newRequest.receiver = foundedReceiver;
      await this.friendRequestRepository.save(newRequest);
      return { message: 'New friend request is pending.', data: newRequest };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //delete friendRequest reject
  async deleteFriendRequestReject(id: number) {
    try {
      await this.friendRequestRepository.delete(id);
      return { message: 'Friend Request is rejected successfully' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async acceptFriendRequest(id: number) {
    const foundedRequest = await this.friendRequestRepository.findOneBy({ id });
    if (!foundedRequest) {
      throw new HttpException('Friend Request not found', HttpStatus.NOT_FOUND);
    }
    foundedRequest.status = 'accepted';
    await this.friendRequestRepository.save(foundedRequest);
    return { message: 'Accepted friend request.' };
  }
  async getFriendList(senderId: number) {
    //get all friend request where user is the sender
    const friendList1 = await this.friendRequestRepository.find({
      where: {
        sender: {
          id: senderId,
        },
        status: 'accepted',
      },
      select: {
        receiver: {
          id: true,
          username: true,
          fullName: true,
          phoneNumber: true,
        },
      },
      relations: {
        receiver: true,
      },
    });
    const renameList1 = friendList1.map((el) => {
      return {
        id: el.id,
        status: el.status,
        user: el.receiver,
      };
    });
    //get all friend where user is the receiver.
    const friendList2 = await this.friendRequestRepository.find({
      where: {
        receiver: {
          id: senderId,
        },
        status: 'accepted',
      },
      select: {
        sender: {
          id: true,
          username: true,
          fullName: true,
          phoneNumber: true,
        },
      },
      relations: {
        sender: true,
      },
    });
    const renameList2 = friendList2.map((el) => {
      return {
        id: el.id,
        status: el.status,
        user: el.sender,
      };
    });
    const result = renameList1.concat(renameList2);
    return { message: 'FriendList is retrieved', data: result };
  }
  async getFriendRequestList(senderId: number) {
    const friendRequest = await this.friendRequestRepository.find({
      where: {
        sender: {
          id: senderId,
        },
        status: 'pending',
      },
      select: {
        receiver: {
          id: true,
          username: true,
          fullName: true,
          phoneNumber: true,
        },
      },
      relations: {
        receiver: true,
      },
    });
    return { message: 'Friend Request List is retrieved', data: friendRequest };
  }
  async getPendingRequestList(receiverId: number) {
    const pendingList = await this.friendRequestRepository.find({
      where: {
        receiver: {
          id: receiverId,
        },
        status: 'pending',
      },
      select: {
        sender: {
          id: true,
          username: true,
          fullName: true,
          phoneNumber: true,
        },
      },
      relations: {
        sender: true,
      },
    });
    return { message: 'Friend Request List is retrieved', data: pendingList };
  }
}
