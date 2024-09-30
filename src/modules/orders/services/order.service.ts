import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IPaginationResponseDto, IQuery } from '../types/pagination.type';
import { IOrder } from '../types/order.type';
import { Inject } from '@nestjs/common';
import { OrdersRepository } from '../../repository/providers/constants';
import { OrdersEntity } from '../../../database/entities/orders.entity';
import { OrdersRepositoryService } from '../../repository/repository-services/orders.repository.service';

export class OrderService {
  constructor(
    private readonly ordersRepositoryService: OrdersRepositoryService,
    @Inject(OrdersRepository)
    private ordersRepository: Repository<OrdersEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  public async getAllPaginated(
    query: IQuery,
  ): Promise<IPaginationResponseDto<IOrder>> {
    return await this.entityManager.transaction(async () => {
      try {
        const queryString = JSON.stringify(query);
        const queryObject = JSON.parse(
          queryString.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
        );
        return await this.ordersRepositoryService.getMany(queryObject);
      } catch (error) {
        throw new Error(`Error fetching paginated order: ${error.message}`);
      }
    });
  }

  public async findOneById(id: number): Promise<IOrder> {
    return this.ordersRepository.findOneBy({id})
  }
}
