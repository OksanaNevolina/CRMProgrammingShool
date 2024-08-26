import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { RolesEntity } from './roles.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { BaseEntity } from './models/base.entity';
import { AccessTokenEntity } from './access-token.entity';

@Entity(TableNameEnum.USERSS)
export class UsersEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @ManyToMany(() => RolesEntity, (role) => role.users)
  @JoinTable()
  roles: RolesEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => AccessTokenEntity, (entity) => entity.user)
  accessTokens?: AccessTokenEntity[];
}
