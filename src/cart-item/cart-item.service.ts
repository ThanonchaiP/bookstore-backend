import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const { cartId, bookId } = createCartItemDto;

    const newItem = await this.cartItemRepository.save({
      ...createCartItemDto,
      cart: { id: cartId },
      book: { id: bookId },
    });

    return { id: newItem.id };
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto) {
    const { quantity } = updateCartItemDto;

    updateCartItemDto.quantity = quantity;
    return await this.cartItemRepository.update(id, updateCartItemDto);
  }

  async remove(id: string) {
    return await this.cartItemRepository.delete(id);
  }
}
