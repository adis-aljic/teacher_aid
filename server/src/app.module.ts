import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm.config';
import { AuthMidleware } from './User/middleware/auth.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRoot(config), ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMidleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
