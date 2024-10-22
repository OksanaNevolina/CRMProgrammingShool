import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';
import {MysqlModule} from "../../mysql/mysql.module";
import {ordersProviders} from "../repository/providers/orders.providers";
import {OrderMapper} from "./services/order.mapper";
import {OrdersRepositoryService} from "../repository/repository-services/orders.repository.service";
import {groupsProviders} from "../repository/providers/groups.providers";


@Module({
    imports: [MysqlModule],
    controllers: [OrderController],
    providers: [
        ...ordersProviders,
        ...groupsProviders,
        OrderService,
        OrderMapper,
        OrdersRepositoryService
    ],
    exports: [
        ...ordersProviders,
        OrderService,
    ],
})
export class OrderModule {}
