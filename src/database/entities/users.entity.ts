// users.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

import {TableNameEnum} from "../enums/table-name.enum";
import {RolesEntity} from "./roles.entity";

@Entity(TableNameEnum.USERSS)
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => RolesEntity, role => role.users)
    @JoinTable()
    roles: RolesEntity[];
}
