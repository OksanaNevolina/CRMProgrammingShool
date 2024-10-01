import { Inject } from '@nestjs/common';
import { OrdersRepository } from '../providers/constants';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrdersEntity } from '../../../database/entities/orders.entity';
import {
  IPaginationResponseDto,
  IQuery,
} from '../../orders/types/pagination.type';
import { IOrder } from '../../orders/types/order.type';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

export class OrdersRepositoryService {
  constructor(
    @Inject(OrdersRepository)
    private ordersRepository: Repository<OrdersEntity>,
  ) {}
  public async getMany(query: IQuery): Promise<IPaginationResponseDto<IOrder>> {
    const {
      page = 1,
      limit = 25,
      order = 'id',
      sortOrder = 'DESC',
      ...searchObject
    } = query;

    const options: IPaginationOptions = {
      page: +page,
      limit: +limit,
      route: '/orders',
    };

    const orderDirection =
      sortOrder &&
      typeof sortOrder === 'string' &&
      ['ASC', 'DESC'].includes(sortOrder.toUpperCase())
        ? sortOrder.toUpperCase()
        : 'DESC';

    const ordersPagination = await paginate<OrdersEntity>(
      this.ordersRepository,
      options,
      {
        where: searchObject as FindOptionsWhere<OrdersEntity>,
        order: { [order]: orderDirection },
      },
    );

    const data = ordersPagination.items.map((order) => ({
      id: order.id,
      name: order.name,
      surname: order.surname,
      email: order.email,
      phone: order.phone,
      age: order.age,
      course: order.course,
      course_format: order.course_format,
      course_type: order.course_type,
      sum: order.sum,
      alreadyPaid: order.alreadyPaid,
      created_at: order.created_at,
      utm: order.utm,
      msg: order.msg,
      status: order.status,
      manager: order.manager,
      group: order.group,
      comments: order.comments,
    }));

    return {
      itemsFound: ordersPagination.meta.totalItems,
      page: ordersPagination.meta.currentPage,
      limit: ordersPagination.meta.itemsPerPage,
      data: data,
    };
  }
}
