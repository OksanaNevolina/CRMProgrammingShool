import { Injectable } from '@nestjs/common';
import { OrdersEntity } from '../../../database/entities/orders.entity';
import { OrderResponseDto } from '../dto/response/order.response.dto';

@Injectable()
export class OrderMapper {
  toDto(order: OrdersEntity): OrderResponseDto {
    return {
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
    };
  }

  toEntity(dto: OrderResponseDto): OrdersEntity {
    const entity = new OrdersEntity();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.surname = dto.surname;
    entity.email = dto.email;
    entity.phone = dto.phone;
    entity.age = dto.age;
    entity.course = dto.course;
    entity.course_format = dto.course_format;
    entity.course_type = dto.course_type;
    entity.sum = dto.sum;
    entity.alreadyPaid = dto.alreadyPaid;
    entity.created_at = dto.created_at;
    entity.utm = dto.utm;
    entity.msg = dto.msg;
    entity.status = dto.status;

    return entity;
  }
}
