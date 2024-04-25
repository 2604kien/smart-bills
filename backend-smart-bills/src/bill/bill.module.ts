import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entities/bill.entity';
import { UserOweModule } from 'src/user-owe/user-owe.module';
import { UserPaidModule } from 'src/user-paid/user-paid.module';

@Module({
  imports:[TypeOrmModule.forFeature([Bill]), UserOweModule, UserPaidModule],
  providers: [BillService],
  controllers: [BillController]
})
export class BillModule {}
