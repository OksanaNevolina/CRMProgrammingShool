import { Module } from '@nestjs/common';
import { MysqlModule } from '../../mysql/mysql.module';
import { rolesProviders } from '../repository/providers/roles.providers';
import { RolesService } from './roles.service';

@Module({
  imports: [MysqlModule],
  providers: [...rolesProviders, RolesService],
  exports: [...rolesProviders],
})
export class RolesModule {}
