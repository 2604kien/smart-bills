import { Module } from '@nestjs/common';
import { UserOweController } from './user-owe.controller';
import { UserOweService } from './user-owe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Owe } from 'src/entities/user-owe.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User_Owe])],
  controllers: [UserOweController],
  providers: [UserOweService]
})
export class UserOweModule {}
