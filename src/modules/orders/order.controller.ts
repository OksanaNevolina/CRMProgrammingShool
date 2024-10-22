import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './services/order.service';
import { IPaginationResponseDto, IQuery } from './types/pagination.type';
import { IOrder } from './types/order.type';
import { OrderMapper } from './services/order.mapper';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateOrderDto } from './dto/request/update-order.request.dto';
import { CreateGroupDto } from './dto/request/create-group.request.dto';
import { CreateGroupResponse } from './dto/response/create-group.response.dto';
import {GroupsEntity} from "../../database/entities/groups.entity";

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderMapper: OrderMapper,
  ) {}

  @ApiOperation({ summary: 'Get all orders' })
  @ApiBearerAuth()
  @Get()
  async getAllPaginated(
    @Query() query: IQuery,
  ): Promise<IPaginationResponseDto<IOrder>> {
    const ordersPaginated = await this.orderService.getAllPaginated(query);
    const mappersOrder = ordersPaginated.data.map((order) =>
      this.orderMapper.toDto(order),
    );
    return { ...ordersPaginated, data: mappersOrder };
  }
  @ApiOperation({ summary: 'Get groups' })
  @ApiBearerAuth()
  @Get('group-all')
  async getGroups(
  ):Promise<GroupsEntity[]>  {
    return  await this.orderService.getAllGroups();
  }

  @ApiOperation({ summary: 'Get order by id' })
  @ApiBearerAuth()
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    const order = await this.orderService.findOneById(id);
    return this.orderMapper.toDto(order);
  }

  @ApiOperation({ summary: 'Add comment order ' })
  @ApiBearerAuth()
  @Post(':id/comment')
  async addComment(
    @Param('id') id: number,
    @CurrentUser() userData: IUserData,
    @Body() { comment }: { comment: string },
  ): Promise<IOrder> {
    return this.orderService.addComment(id, comment, userData);
  }

  @ApiOperation({ summary: 'Update order by id' })
  @ApiBearerAuth()
  @Patch('update/:id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() userData: IUserData,
  ) {
    return this.orderService.updateOrder(id, updateOrderDto, userData);
  }

  @ApiOperation({ summary: 'Create group' })
  @ApiBearerAuth()
  @Post('group')
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<CreateGroupResponse> {
    return await this.orderService.createGroup(createGroupDto);
  }
}
