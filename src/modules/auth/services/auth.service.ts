import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignInRequestDto } from '../dto/request/sign-in.request.dto';

import { AuthUserResponseDto } from '../dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { IUserData } from '../interfaces/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';
import {
  AccessRepository,
  RefreshRepository,
  UsersRepository,
} from '../../repository/providers/constants';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../../database/entities/users.entity';

import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';
import { AccessTokenEntity } from '../../../database/entities/access-token.entity';
import { AccessService } from '../../access/access.service';
import { RefreshService } from '../../refresh/refresh.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly accessService: AccessService,
    private readonly refreshService: RefreshService,

    @Inject(UsersRepository)
    private usersRepository: Repository<UsersEntity>,

    @Inject(RefreshRepository)
    private refreshRepository: Repository<RefreshTokenEntity>,

    @Inject(AccessRepository)
    private accessRepository: Repository<AccessTokenEntity>,
  ) {}

  public async signIn(dto: SignInRequestDto): Promise<AuthUserResponseDto> {
    const userEntity = await this.usersRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true },
    });

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    const isPasswordsMatch = await bcrypt.compare(
      dto.password,
      userEntity.password,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOneBy({ id: userEntity.id });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });

    await this.TokensDelete(user);

    await this.TokensSeve(user, tokens);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async logout(userData: IUserData): Promise<void> {
    const user = await this.usersRepository.findOneBy({
      email: userData.email,
    });
    await this.TokensDelete(user);
  }

  public async refreshToken(userData: IUserData): Promise<TokenResponseDto> {
    const user = await this.usersRepository.findOneBy({
      email: userData.email,
    });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
    });
    await this.TokensSeve(user, tokens);
    await this.TokensDelete(user);
    return tokens;
  }

  private async TokensSeve(
    user: UsersEntity,
    tokens: TokenResponseDto,
  ): Promise<void> {
    await Promise.all([
      this.refreshService.saveToken(user.id, tokens.refreshToken),
      this.accessService.saveToken(user.id, tokens.accessToken),
    ]);
  }
  private async TokensDelete(user: UsersEntity): Promise<void> {
    await Promise.all([
      this.refreshRepository.delete({
        user_id: user.id,
      }),
      this.accessRepository.delete({
        user_id: user.id,
      }),
    ]);
  }
}
