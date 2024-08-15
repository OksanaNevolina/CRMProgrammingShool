import { DataSource } from 'typeorm';

import { RolesRepository} from "./constants";
import {RolesEntity} from "../../../database/entities/roles.entity";

export const rolesProviders = [
    {
        provide: RolesRepository,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RolesEntity),
        inject: [DataSource],
    },
];