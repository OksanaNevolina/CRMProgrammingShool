import { Inject, Injectable } from '@nestjs/common';
import { RolesRepository } from '../repository/providers/constants';
import { Repository } from 'typeorm';
import { RolesEntity } from '../../database/entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject(RolesRepository)
    private rolesRepository: Repository<RolesEntity>,
  ) {}
}
