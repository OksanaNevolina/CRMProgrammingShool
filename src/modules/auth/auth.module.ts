import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';


import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { AuthService } from './services/auth.service';

import { TokenService } from './services/token.service';

import {UserService} from "../users/services/user.service";
import {RefreshService} from "../refresh/refresh.service";
import {AccessService} from "../access/access.service";
import {UserModule} from "../users/user.module";
import {RefreshModule} from "../refresh/refresh.module";
import {AccessModule} from "../access/access.module";


@Module({
    controllers: [AuthController],
    imports: [JwtModule,UserModule,RefreshModule,AccessModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAccessGuard
        },
        AuthService,
        TokenService,
        RefreshService,
        AccessService,
        UserService
    ],
    exports: [],
})
export class AuthModule {}
