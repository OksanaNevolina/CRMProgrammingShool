import { PickType } from '@nestjs/swagger';
import { BaseUserRequestDto } from './user.request.dto';

export class UpdateUserRequestDto extends PickType(BaseUserRequestDto, [
  'name',
]) {}
