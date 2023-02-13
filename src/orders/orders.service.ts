import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    try {
      const { totalPrice, totalQty, items, shippingFee = 0, orderDate } = createOrderDto;

      //Create Order
      const order = await this.orderRepository.save({
        user: { id: userId },
        totalPrice,
        totalQty,
        shippingFee,
        orderDate,
      });

      //Create OrderItem
      items.map((i) => (i.order = { id: order.id }));
      const orderItem = this.orderItemRepository.create(items);
      await this.orderItemRepository.insert(orderItem);

      //Delete CartItem
      const id = items.map((i) => i.cartItemId);
      await this.cartItemRepository.delete(id);

      return { id: order.id };
    } catch (error) {
      console.log(error);
    }
  }

  async findByUserId(userId: string, pageOptions: PageOptionsDto) {
    const { skip, limit } = pageOptions;

    const queryBuilder = this.orderRepository.createQueryBuilder('order');
    queryBuilder.where('order.userId = :userId', { userId });
    queryBuilder.leftJoinAndSelect('order.orderItems', 'orderItems');
    queryBuilder
      .leftJoin('orderItems.book', 'book')
      .addSelect(['book.id', 'book.name', 'book.price', 'book.quantity', 'book.image']);

    queryBuilder.skip(skip).take(limit).orderBy('order.createdAt', 'DESC');

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: pageOptions });

    return new PageDto(entities, pageMetaDto);
  }
}
