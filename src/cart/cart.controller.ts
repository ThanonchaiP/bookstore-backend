import { Controller, Get, Post, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@ApiTags('Cart')
@Controller('cart')
@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    const result = await this.cartService.create(createCartDto);
    return { data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return { data: await this.cartService.findOne(id) };
  }

  @Get('user/:userId')
  async getMyCart(@Param('userId') userId: string, @Req() req: any) {
    if (userId !== req.user.id) throw new UnauthorizedException();
    return { data: await this.cartService.findByUserId(userId) };
  }
}
