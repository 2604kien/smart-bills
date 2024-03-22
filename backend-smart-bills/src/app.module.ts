import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserPaidModule } from './user-paid/user-paid.module';
import { UserOweModule } from './user-owe/user-owe.module';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"admin",
    password:"admin",
    database:"nestJS-smart-bill",
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true,
  }), UserModule, BillModule, UserOweModule, UserPaidModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
