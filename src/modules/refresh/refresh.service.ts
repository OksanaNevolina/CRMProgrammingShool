import { Inject, Injectable } from '@nestjs/common';

import { EntityManager, Repository } from 'typeorm';
import { RefreshRepository } from '../repository/providers/constants';
import { RefreshTokenEntity } from '../../database/entities/refresh-token.entity';

@Injectable()
export class RefreshService {
  constructor(
    @Inject(RefreshRepository)
    private refreshRepository: Repository<RefreshTokenEntity>,
  ) {}
  public async saveToken(
    userId: number,
    token: string,
    em?: EntityManager,
  ): Promise<RefreshTokenEntity> {
    const repo: Repository<RefreshTokenEntity> = em
      ? em.getRepository(RefreshTokenEntity)
      : this.refreshRepository;
    return await repo.save(
      repo.create({
        user_id: userId,
        refreshToken: token,
      }),
    );
  }

  public async isTokenExist(token: string): Promise<boolean> {
    return await this.refreshRepository.exists({
      where: { refreshToken: token },
    });
  }
}
