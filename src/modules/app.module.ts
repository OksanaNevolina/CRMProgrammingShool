import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configs';
import {MysqlModule} from "../mysql/mysql.module";
import {ProvidersModule} from "./repository/providers.module";
import {InitService} from "../init-service/init.service";




@Module({
    imports: [
        MysqlModule,
        ProvidersModule,
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
    ],
    controllers: [],
    providers: [InitService]
})
export class AppModule {}