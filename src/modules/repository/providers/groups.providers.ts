import { DataSource } from 'typeorm';

import { DATA_SOURCE, GroupsRepository } from './constants';
import { GroupsEntity } from '../../../database/entities/groups.entity';

export const groupsProviders = [
  {
    provide: GroupsRepository,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GroupsEntity),
    inject: [DATA_SOURCE],
  },
];
