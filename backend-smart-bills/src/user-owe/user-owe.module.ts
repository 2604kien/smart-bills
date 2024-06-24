import { Module } from '@nestjs/common';
import { UserOweController } from './user-owe.controller';
import { UserOweService } from './user-owe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Owe } from 'src/entities/user-owe.entity';
import { UserPaidModule } from 'src/user-paid/user-paid.module';

@Module({
  imports: [TypeOrmModule.forFeature([User_Owe]), UserPaidModule],
  controllers: [UserOweController],
  providers: [UserOweService],
  exports: [UserOweService],
})
export class UserOweModule {}
