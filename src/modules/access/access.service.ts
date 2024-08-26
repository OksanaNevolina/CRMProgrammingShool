import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { AccessRepository } from '../repository/providers/constants';
import { AccessTokenEntity } from '../../database/entities/access-token.entity';

@Injectable()
export class AccessService {
  constructor(
    @Inject(AccessRepository)
    private accessRepository: Repository<AccessTokenEntity>,
  ) {}
  public async saveToken(
    userId: number,
    token: string,
    em?: EntityManager,
  ): Promise<AccessTokenEntity> {
    const repo: Repository<AccessTokenEntity> = em
      ? em.getRepository(AccessTokenEntity)
      : this.accessRepository;
    return await repo.save(
      repo.create({
        user_id: userId,
        accessToken: token,
      }),
    );
  }

  public async isTokenExist(token: string): Promise<boolean> {
    return await this.accessRepository.exists({
      where: { accessToken: token },
    });
  }
}
