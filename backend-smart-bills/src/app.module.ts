import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPaidModule } from './user-paid/user-paid.module';
import { UserOweModule } from './user-owe/user-owe.module';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';

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
  }), UserModule, BillModule, UserOweModule, UserPaidModule]
})
export class AppModule {}
