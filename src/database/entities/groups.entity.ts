import {Column, Entity, OneToMany} from "typeorm";
import {TableNameEnum} from "../enums/table-name.enum";
import {BaseEntity} from "./models/base.entity";
import {OrdersEntity} from "./orders.entity";


@Entity(TableNameEnum.GROUPS)
export class GroupsEntity extends BaseEntity{

    @Column()
    name: string;

    @OneToMany(() => OrdersEntity, (order) => order.group)
    orders?: OrdersEntity[];

}