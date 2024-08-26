import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { BaseEntity } from './models/base.entity';
import { UsersEntity } from './users.entity';

@Entity(TableNameEnum.REFRESH_TOKEN)
export class RefreshTokenEntity extends BaseEntity {
  @Column('text')
  refreshToken: string;

  @Column()
  user_id: number;
  @ManyToOne(() => UsersEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UsersEntity;
}
