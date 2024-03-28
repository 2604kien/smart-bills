import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge: 24*60*60*1000,
      secure:true,
      httpOnly: true,
      sameSite:'none'
    }
  }))
  await app.listen(process.env.PORT||3500);
}
bootstrap();
