// roles.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import {TableNameEnum} from "../enums/table-name.enum";
import {UsersEntity} from "./users.entity";


@Entity(TableNameEnum.ROLES)
export class RolesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => UsersEntity, user => user.roles)
    users: UsersEntity[];
}
