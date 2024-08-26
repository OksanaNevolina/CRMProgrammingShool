import { Module } from '@nestjs/common';
import { MysqlModule } from '../../mysql/mysql.module';
import { refreshProviders } from '../repository/providers/refresh.providers';
import { RefreshService } from './refresh.service';

@Module({
  imports: [MysqlModule],
  providers: [...refreshProviders, RefreshService],
  exports: [...refreshProviders],
})
export class RefreshModule {}
