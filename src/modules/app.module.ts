import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configs';
import { MysqlModule } from '../mysql/mysql.module';
import { InitService } from '../init-service/init.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

import { OrderModule } from './orders/order.module';
import { AccessModule } from './access/access.module';
import { RefreshModule } from './refresh/refresh.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    MysqlModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    OrderModule,
    AccessModule,
    RefreshModule,
    RolesModule,
  ],
  controllers: [],
  providers: [InitService],
})
export class AppModule {}
