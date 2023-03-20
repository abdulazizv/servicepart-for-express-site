import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private readonly orderRepo: typeof Order) {}
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.orderRepo.create(createOrderDto);
    newOrder.order_unique_id = String(newOrder.id + 1000);
    await newOrder.save();
    return newOrder;
  }

  async findAll() {
    const allServices = await this.orderRepo.findAll({
      include: { all: true },
    });
    if (allServices.length < 1) {
      throw new HttpException('Services not found', HttpStatus.NOT_FOUND);
    }
    return allServices;
  }

  async findOne(id: number) {
    return await this.orderRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepo.update(updateOrderDto, {
      where: {
        id: id,
      },
    });
    return true;
  }

  async remove(id: number) {
    await this.orderRepo.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }
}
