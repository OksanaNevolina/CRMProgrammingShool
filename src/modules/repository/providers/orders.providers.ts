import { DataSource } from 'typeorm';

import { DATA_SOURCE, OrdersRepository } from './constants';
import { OrdersEntity } from '../../../database/entities/orders.entity';

export const ordersProviders = [
  {
    provide: OrdersRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrdersEntity),
    inject: [DATA_SOURCE],
  },
];
