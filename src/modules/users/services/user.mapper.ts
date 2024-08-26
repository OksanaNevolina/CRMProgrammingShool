import { UsersEntity } from '../../../database/entities/users.entity';
import { UserResponseDto } from '../dto/response/user.response.dto';

export class UserMapper {
  public static toResponseDto(usersEntity: UsersEntity): UserResponseDto {
    return {
      id: usersEntity.id,
      name: usersEntity.name,
      email: usersEntity.email,
    };
  }
}
