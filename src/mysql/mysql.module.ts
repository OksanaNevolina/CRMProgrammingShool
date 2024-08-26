import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MysqlService } from './mysql.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DATA_SOURCE } from '../modules/repository/providers/constants';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlService,
    }),
  ],
  providers: [
    MysqlService,
    {
      provide: DATA_SOURCE,
      useFactory: async (mysqlService: MysqlService) => {
        const options =
          mysqlService.createTypeOrmOptions() as DataSourceOptions;
        const dataSource = new DataSource(options);
        return dataSource.initialize();
      },
      inject: [MysqlService],
    },
  ],
  exports: [DATA_SOURCE],
})
export class MysqlModule {}
