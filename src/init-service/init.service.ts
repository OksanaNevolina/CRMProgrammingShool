import {Inject, Injectable} from '@nestjs/common';


import * as bcrypt from 'bcrypt';
import {RoleEnum} from "../database/enums/role.enum";
import {CredentialsEmailsEnum} from "../database/enums/credentials.emails.enum";
import {UsersEntity} from "../database/entities/users.entity";
import {RolesEntity} from "../database/entities/roles.entity";
import {RolesRepository, UsersRepository} from "../modules/repository/providers/constants";
import {Repository} from "typeorm";


@Injectable()
export class InitService {
    constructor(
        @Inject(UsersRepository)
        private usersRepository: Repository<UsersEntity>,
        @Inject(RolesRepository)
        private rolesRepository: Repository<RolesEntity>,
    ) {}

    async onModuleInit() {
        const adminRole = await this.rolesRepository.findOne({ where: { name: RoleEnum.ADMIN } });
        const managerRole = await this.rolesRepository.findOne({ where: { name: RoleEnum.MANAGER } });

        if (!adminRole) {
            await this.rolesRepository.save({ name: RoleEnum.ADMIN});
        }

        if (!managerRole) {
            await this.rolesRepository.save({ name: RoleEnum.MANAGER });
        }

        const adminUser = await this.usersRepository.findOne({ where: { email: CredentialsEmailsEnum.GMAIL} });

        if (!adminUser) {
            const password = await bcrypt.hash(RoleEnum.ADMIN, 10);
            const admin = this.usersRepository.create({
                email: CredentialsEmailsEnum.GMAIL,
                password,
                roles: [adminRole],
            });
            await this.usersRepository.save(admin);
        }
    }
}
