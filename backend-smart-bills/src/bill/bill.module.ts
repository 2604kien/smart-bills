import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entity';
import { UserOweModule } from 'src/user-owe/user-owe.module';
import { UserPaidModule } from 'src/user-paid/user-paid.module';
import { User_Owe } from 'src/entities/user-owe.entity';
import { User_Paid } from 'src/entities/user-paid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bill, User_Owe, User_Paid]),
    UserOweModule,
    UserPaidModule,
  ],
  providers: [BillService],
  controllers: [BillController],
})
export class BillModule {}
