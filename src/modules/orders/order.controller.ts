import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { IPaginationResponseDto, IQuery } from './types/pagination.type';
import { IOrder } from './types/order.type';
import { OrderMapper } from './services/order.mapper';

@ApiTags('Orders')
@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderMapper: OrderMapper,
  ) {}

  @ApiOperation({ summary: 'Get all orders' })
  @ApiBearerAuth()
  @Get('orders')
  async getAllPaginated(
    @Query() query: IQuery,
  ): Promise<IPaginationResponseDto<IOrder>> {
    const ordersPaginated = await this.orderService.getAllPaginated(query);
    const mappersOrder = ordersPaginated.data.map((order) =>
      this.orderMapper.toDto(order),
    );
    return { ...ordersPaginated, data: mappersOrder };
  }
}
