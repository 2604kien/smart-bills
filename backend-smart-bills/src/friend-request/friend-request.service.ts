import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from 'src/entities/friend-request.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { FriendRequestDto} from './Dtos/friend-request.dto';

@Injectable()
export class FriendRequestService {
    constructor(@InjectRepository(FriendRequest) private friendRequestRepository:Repository<FriendRequest>,
    @InjectRepository(User) private userRepository:Repository<User>
){}

    async getAll(){
        return await this.friendRequestRepository.find({
            select:{
                sender:{
                    id:true,
                    username:true
                },
                receiver:{
                    id:true,
                    username:true
                }
            },
            relations:{
                sender:true,
                receiver:true,
            }
        })
    }
    async getById(id:number){
        try{
            const foundedRequest=await this.friendRequestRepository.findOne({
                where:{id:id},
                select:{
                    sender:{
                        id:true,
                        username:true
                    },
                    receiver:{
                        id:true,
                        username:true
                    }
                },
                relations:{
                    sender:true,
                    receiver:true,
                }
            })
            return {message:`Request with id ${id} is retrieved successfully`, data:foundedRequest};
        }
        catch (error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //Add friend Request
    async addFriendRequest(data:FriendRequestDto){
        const foundedRequest=await this.friendRequestRepository.findOneBy({sender:{id:data.sender.id}, receiver:{id:data.receiver.id}});
        if(foundedRequest){
            throw new HttpException('You already sent friend request to this person.',HttpStatus.CONFLICT);
        }
        const foundedSender=await this.userRepository.findOneBy({id:data.sender.id});
        const foundedReceiver=await this.userRepository.findOneBy({id:data.receiver.id});
        if(!foundedReceiver){
            throw new HttpException('User with this mobile number is not found.', HttpStatus.NOT_FOUND)
        }
        try{
            const foundedSender=await this.userRepository.findOneBy({id:data.sender.id});
            const foundedReceiver=await this.userRepository.findOneBy({id:data.receiver.id});
            const newRequest=new FriendRequest();
            newRequest.sender=foundedSender;
            newRequest.receiver=foundedReceiver;
            await this.friendRequestRepository.save(newRequest);
            return {message: "New friend request is pending.", data: newRequest}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    //delete friendRequest reject
    async deleteFriendRequestReject(id:number){
        try{
            await this.friendRequestRepository.delete(id);
            return {message:"Friend Request is rejected successfully"}
        }
        catch(error){
            console.log(error);
            throw new HttpException('Something went wrong, please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async acceptFriendRequest(id:number){
        const foundedRequest=await this.friendRequestRepository.findOneBy({id});
        if(!foundedRequest){
            throw new HttpException('Friend Request not found', HttpStatus.NOT_FOUND);
        }
        foundedRequest.status="accepted";
        await this.friendRequestRepository.save(foundedRequest);
        return {message:"Accepted friend request."}
    }
    async getFriendList(id:number, senderId:number){
        const friendList=await this.friendRequestRepository.find({where:{
                sender:{
                    id:senderId
                }
            },
            select:{
                sender:{
                    id:true,
                    username:true,
                    fullName:true,
                }
            },
            relations:{
                sender:true,
                receiver:true
            }
        });
        return {message:"FriendList is retrieved", friendList}
    }
}

