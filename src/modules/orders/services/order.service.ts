import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IPaginationResponseDto, IQuery } from '../types/pagination.type';
import { IOrder } from '../types/order.type';
import { Inject } from '@nestjs/common';
import { OrdersRepository } from '../../repository/providers/constants';
import { OrdersEntity } from '../../../database/entities/orders.entity';
import { OrdersRepositoryService } from '../../repository/repository-services/orders.repository.service';
import {ICommentPesponseDto} from "../dto/response/comment.response.dto";
import {IUserData} from "../../auth/interfaces/user-data.interface";
import {IComment} from "../types/comment.type";

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

  async addComment(id: number, comment: string, userData: IUserData):Promise<IOrder> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) {
      throw new Error('Order not found');
    }

    if (!order.manager || order.manager === userData.email) {
      order.manager = userData.email;

      if (!order.status || order.status === 'New') {
        order.status = 'In Work';
      }


      const newComment = {
        comment,
        user:userData,
        date: new Date(),
      };

      order.comments = order.comments ? [...order.comments, newComment] : [newComment];
      await this.ordersRepository.save(order);

      return order;
    } else {
      throw new Error('Order is already taken by another manager');
    }
  }
}
