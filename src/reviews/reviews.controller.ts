import { Controller, Post, Body, Patch, Param, UseGuards, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('Review')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: any) {
    const userId = req.user.id;
    return this.reviewsService.create(userId, createReviewDto);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return { data: await this.reviewsService.getReviewById(+id) };
  }

  @Get('/books/:bookId')
  async getOneByBookId(@Param('bookId') id: string) {
    return { data: await this.reviewsService.getReviewsByBookId(id) };
  }

  @Patch(':id')
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewsService.update(+id, updateReviewDto);
  }
}
