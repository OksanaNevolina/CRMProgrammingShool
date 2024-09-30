import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { IPaginationResponseDto, IQuery } from './types/pagination.type';
import { IOrder } from './types/order.type';
import { OrderMapper } from './services/order.mapper';

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
  @ApiOperation({ summary: 'Get order by id' })
  @ApiBearerAuth()
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    const order = await this.orderService.findOneById(id);
    return this.orderMapper.toDto(order);
  }
}
