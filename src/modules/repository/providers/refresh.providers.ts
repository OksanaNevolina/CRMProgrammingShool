import { DataSource } from 'typeorm';

import { DATA_SOURCE, RefreshRepository } from './constants';
import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';

export const refreshProviders = [
  {
    provide: RefreshRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RefreshTokenEntity),
    inject: [DATA_SOURCE],
  },
];
