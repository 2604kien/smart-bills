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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"admin",
    password:"admin",
    database:"nestJS-smart-bill",
    entities:[__dirname + '/**/*.entity{.ts,.js}'],
    synchronize:true,
  }), UserModule, BillModule, UserOweModule, UserPaidModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
