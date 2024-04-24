import { Module } from '@nestjs/common';
import { UserPaidController } from './user-paid.controller';
import { UserPaidService } from './user-paid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Paid } from 'src/entities/user-paid.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User_Paid])],
  controllers: [UserPaidController],
  providers: [UserPaidService],
  exports:[UserPaidService]
})
export class UserPaidModule {}
