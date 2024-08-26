import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenType } from '../enums/token-type.enum';
import { TokenService } from '../services/token.service';

import { UsersRepository } from '../../repository/providers/constants';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../../database/entities/users.entity';
import { RefreshService } from '../../refresh/refresh.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private refreshService: RefreshService,
    private tokenService: TokenService,

    @Inject(UsersRepository)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isExist = await this.refreshService.isTokenExist(refreshToken);
    if (!isExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = { user };
    return true;
  }
}
