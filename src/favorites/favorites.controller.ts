import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

@ApiTags('Favorite')
@Controller('favorites')
@ApiBearerAuth('access-token')
@UseGuards(AccessTokenGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return await this.favoritesService.create(createFavoriteDto);
  }

  @Get('me')
  async findOne(@Req() req: any, @Query() pageOptions: PageOptionsDto) {
    const userId = req.user.id;
    return await this.favoritesService.me(userId, pageOptions);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.favoritesService.remove(id);
  }
}
