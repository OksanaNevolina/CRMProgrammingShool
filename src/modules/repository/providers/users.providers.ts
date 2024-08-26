import { UsersEntity } from '../../../database/entities/users.entity';
import { DATA_SOURCE, UsersRepository } from './constants';
import { DataSource } from 'typeorm';

export const usersProviders = [
  {
    provide: UsersRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersEntity),
    inject: [DATA_SOURCE],
  },
];
