import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { CategoriesService } from './categories.service';
import { CategoryParamDto } from './dto/category-param.dto';

@ApiTags('Category')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return await this.categoriesService.getCategory();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Query(new ValidationPipe({ transform: true })) params: CategoryParamDto,
    @Query() pageOptions: PageOptionsDto,
  ) {
    return await this.categoriesService.getCategoryById(id, params, pageOptions);
  }
}
