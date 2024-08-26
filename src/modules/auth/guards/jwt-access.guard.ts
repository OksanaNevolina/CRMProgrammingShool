import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenType } from '../enums/token-type.enum';
import { TokenService } from '../services/token.service';

import { SKIP_AUTH } from '../constantsAuth/constantsAuth';
import { UsersRepository } from '../../repository/providers/constants';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../../database/entities/users.entity';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
    @Inject(UsersRepository)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const findAccessToken =
      await this.tokenService.isAccessTokenExist(accessToken);
    if (!findAccessToken) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = {
      userId: user.id,
      email: user.email,
    };
    return true;
  }
}
