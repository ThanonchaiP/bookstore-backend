import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiTags('Cart-item')
@Controller('cart-item')
@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    return { data: await this.cartItemService.create(createCartItemDto) };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return await this.cartItemService.update(id, updateCartItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartItemService.remove(id);
  }
}
