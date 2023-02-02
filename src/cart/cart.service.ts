import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const { userId } = createCartDto;
    const cart = await this.cartRepository.save({ user: { id: userId } });
    return { id: cart.id };
  }

  async findOne(id: string) {
    const queryBuilder = await this.cartRepository.createQueryBuilder('cart').where('cart.id = :id', { id });
    queryBuilder.leftJoin('cart.user', 'user').addSelect(['user.id', 'user.firstname', 'user.lastname']);
    queryBuilder
      .leftJoin('cart.cartItems', 'cartItems')
      .addSelect(['cartItems.id', 'cartItems.quantity', 'cartItems.price']);

    queryBuilder
      .leftJoin('cartItems.book', 'book')
      .addSelect(['book.id', 'book.name', 'book.price', 'book.quantity', 'book.image']);

    return queryBuilder.getOne();
  }

  async findByUserId(userId: string) {
    const queryBuilder = await this.cartRepository.createQueryBuilder('cart').select(['cart.id']);

    queryBuilder.leftJoin('cart.user', 'user').where('user.id = :userId', { userId });

    queryBuilder
      .leftJoin('cart.cartItems', 'cartItems')
      .addSelect(['cartItems.id', 'cartItems.quantity', 'cartItems.price']);

    queryBuilder
      .leftJoin('cartItems.book', 'book')
      .addSelect(['book.id', 'book.name', 'book.price', 'book.quantity', 'book.image']);

    return queryBuilder.getOne();
  }
}
