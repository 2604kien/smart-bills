import { Module } from '@nestjs/common';
import { UserOweController } from './user-owe.controller';
import { UserOweService } from './user-owe.service';

@Module({
  controllers: [UserOweController],
  providers: [UserOweService]
})
export class UserOweModule {}
