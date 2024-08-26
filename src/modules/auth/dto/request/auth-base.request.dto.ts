import { IsNotEmpty, IsString } from 'class-validator';

export class AuthBaseRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
