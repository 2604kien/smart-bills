import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPaidModule } from './user-paid/user-paid.module';
import { UserOweModule } from './user-owe/user-owe.module';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from './gateway/gateway.module';
import { MyGateWay } from './gateway/gateway';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot(dataSourceOptions),GatewayModule, UserModule, BillModule, UserOweModule, UserPaidModule, AuthModule, FriendRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
