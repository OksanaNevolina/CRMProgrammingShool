import { UserService } from './services/user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get me' })
  @ApiBearerAuth()
  @Get('get-me')
  public async findMe(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    return await this.userService.findMe(userData);
  }
  @ApiOperation({ summary: 'Update me' })
  @ApiBearerAuth()
  @Put('update-me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateMe(userData, dto);
  }
  @ApiOperation({ summary: 'Delete me' })
  @ApiBearerAuth()
  @Delete('delete-me')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.deleteMe(userData);
  }
}
