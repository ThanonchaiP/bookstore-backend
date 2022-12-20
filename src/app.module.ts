import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/entities/author.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Category } from './categories/entities/category.entity';
import { BannersModule } from './banners/banners.module';
import { Banner } from './banners/entities/banner.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL,
      host: 'localhost',
      port: 5432,
      username: 'abc123',
      password: 'abc123',
      database: 'bookstoredb',
      entities: [Author, User, Category, Banner],
      synchronize: true,
    }),
    CategoriesModule,
    AuthorsModule,
    UsersModule,
    BannersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
