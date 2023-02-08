import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, UseGuards, Req, Query } from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@Controller('orders')
@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return { data: await this.ordersService.create(createOrderDto, userId) };
  }

  @Get('/me')
  async me(@Query() pageOptions: PageOptionsDto, @Req() req: any) {
    const userId = req.user.id;
    return await this.ordersService.findByUserId(userId, pageOptions);
  }
}
