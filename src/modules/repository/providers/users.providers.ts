import { DataSource } from 'typeorm';

import {UsersEntity} from "../../../database/entities/users.entity";
import {UsersRepository} from "./constants";

export const usersProviders = [
    {
        provide: UsersRepository,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UsersEntity),
        inject: [DataSource],
    },
];