import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configs';
import {MysqlModule} from "../mysql/mysql.module";



@Module({
    imports: [
        MysqlModule,
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}