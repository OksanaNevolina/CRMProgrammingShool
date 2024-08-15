import { DataSource } from 'typeorm';


import {OrdersRepository} from "./constants";
import {OrdersEntity} from "../../../database/entities/orders.entity";

export const ordersProviders = [
    {
        provide: OrdersRepository,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrdersEntity),
        inject: [DataSource],
    },
];