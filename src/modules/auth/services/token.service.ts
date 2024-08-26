import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JWTConfig } from '../../../configs/config.type';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import { TokenType } from '../enums/token-type.enum';
import { JwtPayload } from '../types/jwt-payload.type';
import {AccessRepository} from "../../repository/providers/constants";
import {Repository} from "typeorm";


import {AccessTokenEntity} from "../../../database/entities/access-token.entity";


@Injectable()
export class TokenService {
    private jwtConfig: JWTConfig;

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService<Config>,
        @Inject(AccessRepository)
        private accessRepository: Repository<AccessTokenEntity>,

    ) {
        this.jwtConfig = this.configService.get<JWTConfig>('jwt');
    }

    public async generateAuthTokens(
        payload: JwtPayload,
    ): Promise<TokenResponseDto> {
        const accessTokenSecret: string  = this.jwtConfig.managerAccessTokenSecret;
        const accessExpiresIn: number= this.jwtConfig.managerAccessTokenExpiration;
        const refreshTokenSecret: string  = this.jwtConfig.managerRefreshTokenSecret;
        const refreshExpiresIn: number = this.jwtConfig.managerRefreshTokenExpiration;

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: accessTokenSecret,
            expiresIn: accessExpiresIn,
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: refreshTokenSecret,
            expiresIn: refreshExpiresIn,
        });

        return {
            accessToken,
            refreshToken,
        };
    }
    public async verifyToken(
        token: string,
        type: TokenType,
    ): Promise<JwtPayload> {
        try {
            const secret = this.getSecret(type);

            return await this.jwtService.verifyAsync(token, { secret });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
    private getSecret(type: TokenType): string {
        switch (type) {
            case TokenType.ACCESS:
                return this.jwtConfig.managerAccessTokenSecret;
            case TokenType.REFRESH:
                return this.jwtConfig.managerRefreshTokenSecret;
        }
    }

    public async checkToken(
        token: string,
        type: TokenType,
    ): Promise<JwtPayload> {
        return await this.checkTokenManager(token, type);
    }


    private async checkTokenManager(
        token: string,
        type: TokenType,
    ): Promise<any> {
        try {
            let secret: string;

            switch (type) {
                case TokenType.ACCESS:
                    secret = this.jwtConfig.managerAccessTokenSecret;
                    break;
                case TokenType.REFRESH:
                    secret = this.jwtConfig.managerRefreshTokenSecret;
                    break;
            }
            return await this.jwtService.verifyAsync(token, { secret });
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
    public async isAccessTokenExist(
        accessToken: string,
    ): Promise<AccessTokenEntity> {
        return  this.accessRepository.findOneBy({
            accessToken: accessToken,
        })
    }

}