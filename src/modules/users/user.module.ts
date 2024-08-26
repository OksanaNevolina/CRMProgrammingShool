import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { MysqlModule } from '../../mysql/mysql.module';
import { usersProviders } from '../repository/providers/users.providers';

@Module({
  imports: [MysqlModule],
  controllers: [UserController],
  providers: [...usersProviders, UserService],
  exports: [...usersProviders, UserService],
})
export class UserModule {}
