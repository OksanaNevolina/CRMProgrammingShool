import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { usersProviders } from './providers/users.providers';
import { rolesProviders } from './providers/roles.providers';
import { ordersProviders } from './providers/orders.providers';
import {UsersEntity} from "../../database/entities/users.entity";
import {RolesEntity} from "../../database/entities/roles.entity";

const providers = [
    ...usersProviders,
    ...rolesProviders,
    ...ordersProviders,
];

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity, RolesEntity]),
    ],
    providers: providers,
    exports: providers,
})
export class ProvidersModule {}

