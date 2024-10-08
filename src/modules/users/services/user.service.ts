import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUserData } from '../../auth/interfaces/user-data.interface';

import { UserResponseDto } from '../dto/response/user.response.dto';
import { UpdateUserRequestDto } from '../dto/request/update-user.request.dto';

import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';
import { UsersEntity } from '../../../database/entities/users.entity';

import { UsersRepository } from '../../repository/providers/constants';
import {UserMapper} from "./user.mapper";
import {AuthMapper} from "../../auth/services/auth.mapper";

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @Inject(UsersRepository)
    private userRepository: Repository<UsersEntity>,
  ) {}

  public async findMe(userData: IUserData): Promise<UserResponseDto> {
    return await this.entityManager.transaction(async (em: EntityManager) => {
      const userRepository = em.getRepository(UsersEntity);
      try {
        const entity = await userRepository.findOneBy({
          id: userData.id,
        });
        return UserMapper.toResponseDto(entity)
      } catch (error) {
        throw new UnprocessableEntityException('User not found');
      }
    });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.entityManager.transaction(async (em: EntityManager) => {
      const userRepository = em.getRepository(UsersEntity);
      try {
        const entity = await this.findByIdOrThrow(userData.id, em);
        const user = await userRepository.save({ ...entity, ...dto });
        return UserMapper.toResponseDto(user);
      } catch (error) {
        throw new UnprocessableEntityException('Failed to update user data');
      }
    });
  }

  // public async deleteMe(userData: IUserData): Promise<void> {
  //   await this.entityManager.transaction(async (em: EntityManager) => {
  //     const refreshTokenRepository = em.getRepository(RefreshTokenEntity);
  //     const userRepository = em.getRepository(UsersEntity);
  //     try {
  //       const user = await this.findByIdOrThrow(userData.id, em);
  //       if (!user) {
  //         throw new NotFoundException('User not found');
  //       }
  //       const refreshTokens = await refreshTokenRepository.find({
  //         where: { user: { id: userData.id } },
  //       });
  //
  //
  //       await refreshTokenRepository.delete({ user: { id: userData.id } });
  //
  //
  //       await userRepository.remove(user);
  //
  //
  //     } catch (error) {
  //       throw new UnprocessableEntityException('Failed to delete user data');
  //     }
  //   });
  // }
  //

  public async findByIdOrThrow(
    userId: number,
    em?: EntityManager,
  ): Promise<UsersEntity> {
    const userRepository = em.getRepository(UsersEntity);
    const entity = await userRepository.findOneBy({ id: userId });
    if (!entity) {
      throw new UnprocessableEntityException();
    }
    return entity;
  }
}
