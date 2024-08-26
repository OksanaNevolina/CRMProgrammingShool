import { Module } from '@nestjs/common';
import { MysqlModule } from '../../mysql/mysql.module';
import { accessProviders } from '../repository/providers/access.providers';
import { AccessService } from './access.service';

@Module({
  imports: [MysqlModule],
  providers: [...accessProviders, AccessService],
  exports: [...accessProviders],
})
export class AccessModule {}
