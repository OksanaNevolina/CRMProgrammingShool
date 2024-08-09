import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleOptions,
    TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import {Config, mysqlConfig} from '../configs/config.type';

@Injectable()
export class MysqlService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService<Config>) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        const mysqlConfig = this.configService.get<mysqlConfig>('mysql');
        return {
            type: 'mysql',
            host: mysqlConfig.host,
            port: mysqlConfig.port,
            username: mysqlConfig.user,
            password: mysqlConfig.password,
            database: mysqlConfig.dbName,
            entities: [
                path.join(
                    process.cwd(),
                    'dist',
                    'src',
                    'database',
                    'entities',
                    '*.entity.js',
                ),
            ],
            migrations: [
                path.join(
                    process.cwd(),
                    'dist',
                    'src',
                    'database',
                    'migrations',
                    '*.js',
                ),
            ],
            migrationsRun: true,
            synchronize: false,
        };
    }
}