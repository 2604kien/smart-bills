import { Module } from '@nestjs/common';
import { UserPaidController } from './user-paid.controller';
import { UserPaidService } from './user-paid.service';

@Module({
  controllers: [UserPaidController],
  providers: [UserPaidService]
})
export class UserPaidModule {}
