import { DataSource } from 'typeorm';

import { AccessRepository, DATA_SOURCE } from './constants';
import { AccessTokenEntity } from '../../../database/entities/access-token.entity';

export const accessProviders = [
  {
    provide: AccessRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AccessTokenEntity),
    inject: [DATA_SOURCE],
  },
];
