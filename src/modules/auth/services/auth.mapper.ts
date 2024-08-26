
import { AuthUserResponseDto } from '../dto/response/auth-user.response.dto';
import { TokenResponseDto } from '../dto/response/token.response.dto';
import {UsersEntity} from "../../../database/entities/users.entity";
import {UserMapper} from "../../users/services/user.mapper";

export class AuthMapper {
    public static toResponseDto(
        usersEntity: UsersEntity,
        tokens: TokenResponseDto,
    ): AuthUserResponseDto {
        return {
            user: UserMapper.toResponseDto(usersEntity),
            tokens,
        };
    }
}