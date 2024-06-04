import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from 'src/entities/userdetail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserDetail])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
