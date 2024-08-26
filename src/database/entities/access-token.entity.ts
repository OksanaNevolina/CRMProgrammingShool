import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { BaseEntity } from './models/base.entity';
import { UsersEntity } from './users.entity';

@Entity(TableNameEnum.ACCESS_TOKEN)
export class AccessTokenEntity extends BaseEntity {
  @Column('text')
  accessToken: string;

  @Column()
  user_id: number;
  @ManyToOne(() => UsersEntity, (entity) => entity.accessTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UsersEntity;
}
