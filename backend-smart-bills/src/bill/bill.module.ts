import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';

@Module({
  providers: [BillService],
  controllers: [BillController]
})
export class BillModule {}
