import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetail } from 'src/entities/userdetail.entity';
import { Repository } from 'typeorm';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDetail)
    private userRepository: Repository<UserDetail>,
  ) {}
  //get all user from the database
  async getAllUser(): Promise<UserDetail[]> {
    return this.userRepository.find();
  }
  //get one user by id
  async getOneUser(id: number): Promise<object> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        oweList: {
          id: true,
        },
        paidList: {
          id: true,
        },
        createdBillList: {
          id: true,
        },
      },
      relations: {
        createdBillList: true,
        oweList: true,
        paidList: true,
      },
    });
    if (!user) {
      throw new HttpException('UserDetail not found.', HttpStatus.NOT_FOUND);
    }
    try {
      delete user.password;
      return { message: 'UserDetail data is retrieved.', data: user };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Sever Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //create new user
  async createNewUser(user: UserDto): Promise<object> {
    const existUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (existUser) {
      throw new HttpException(
        `UserDetail ${user.username} is already created.`,
        HttpStatus.CONFLICT,
      );
    }
    try {
      const newUser = new UserDetail();
      newUser.fullName = user.fullName;
      newUser.username = user.username;
      newUser.phoneNumber = user.phoneNumber;
      newUser.password = await bcrypt.hash(user.password, 10);
      newUser.email = user.email;
      await this.userRepository.save(newUser);
      return {
        message: 'UserDetail is created successfully',
        data: newUser,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //update user data
  async updateUser(user: UserUpdateDto, id: number): Promise<object> {
    const foundedUser = await this.userRepository.findOneBy({ id });
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    if (!foundedUser) {
      throw new HttpException('UserDetail is not found.', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update(id, user);
    return { message: 'UserDetail data is updated' };
  }
  //delete user by ID
  async deleteUser(id: number): Promise<object> {
    const foundedUser = await this.userRepository.findOneBy({ id });
    if (!foundedUser) {
      throw new HttpException('UserDetail is not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.userRepository.delete(id);
      return { message: 'UserDetail is deleted successfully' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserByPhoneNumber(phoneNumber: string): Promise<object> {
    if (!phoneNumber) {
      throw new HttpException(
        'Please provide valid Phone Number',
        HttpStatus.NO_CONTENT,
      );
    }
    const foundedUser = await this.userRepository.findOne({
      where: { phoneNumber },
      select: {
        fullName: true,
        username: true,
        email: true,
        phoneNumber: true,
        id: true,
      },
    });
    if (!foundedUser) {
      throw new HttpException(
        'There is no user with this phone Number',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      message: 'UserDetail with this Phone Number is founded.',
      data: foundedUser,
    };
  }
}
