import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IPaginationResponseDto, IQuery } from '../types/pagination.type';
import { IOrder } from '../types/order.type';
import {
  ConflictException,
  ForbiddenException,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  GroupsRepository,
  OrdersRepository,
} from '../../repository/providers/constants';
import { OrdersEntity } from '../../../database/entities/orders.entity';
import { OrdersRepositoryService } from '../../repository/repository-services/orders.repository.service';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UpdateOrderDto } from '../dto/request/update-order.request.dto';
import { CreateGroupResponse } from '../dto/response/create-group.response.dto';
import { CreateGroupDto } from '../dto/request/create-group.request.dto';
import { GroupsEntity } from '../../../database/entities/groups.entity';

export class OrderService {
  constructor(
    private readonly ordersRepositoryService: OrdersRepositoryService,
    @Inject(OrdersRepository)
    private ordersRepository: Repository<OrdersEntity>,
    @Inject(GroupsRepository)
    private groupsRepository: Repository<GroupsEntity>,
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
    return this.ordersRepository.findOneBy({ id });
  }

  async addComment(
    id: number,
    comment: string,
    userData: IUserData,
  ): Promise<IOrder> {
    const order:IOrder = await this.ordersRepository.findOne({ where: { id } });
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
        user: userData,
        date: new Date(),
      };

      order.comments = order.comments
        ? [...order.comments, newComment]
        : [newComment];
      await this.ordersRepository.save(order);

      return order;
    } else {
      throw new Error('Order is already taken by another manager');
    }
  }

  async updateOrder(
      id: number,
      updateOrderDto: UpdateOrderDto,
      userData: IUserData,
  ) {
    try {
      const order = await this.ordersRepository.findOne({ where: { id } });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      if (!order.manager || order.manager === userData.email) {
        order.manager = userData.email;
      }

      if (order.manager && order.manager !== userData.email) {
        throw new ForbiddenException('You cannot edit this order');
      }

      // Якщо передано groupId, оновлюємо групу заявки
      if (updateOrderDto.groupId) {
        const group = await this.groupsRepository.findOne({
          where: { id: updateOrderDto.groupId },
        });
        if (!group) {
          throw new NotFoundException('Group not found');
        }
        order.group = group;
      }

      return await this.ordersRepository.save(order);
    } catch (error) {
      throw new Error('Order not found or You cannot edit this order');
    }
  }


  async getAllGroups(): Promise<GroupsEntity[]> {
    const groups = await this.groupsRepository.find({ relations: ['orders'] });
    return groups;
  }

  async createGroup(
    createGroupDto: CreateGroupDto,
  ): Promise<CreateGroupResponse> {
    const { name } = createGroupDto;

    try {
      const existingGroup = await this.groupsRepository.findOneBy({
        name,
      });
      if (existingGroup) {
        throw new ConflictException('Group name must be unique.');
      }

      const newGroup = this.groupsRepository.create({ name });
      return await this.groupsRepository.save(newGroup);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to create group');
      }
    }
  }
}
