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
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PublisherModule } from './publisher/publisher.module';
import { Publisher } from './publisher/entities/publisher.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // url: process.env.DATABASE_URL, //for production
      host: process.env.DATABASE_HOST,
      port: Number(process.env.PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [Author, User, Category, Banner, Publisher, Book],
      synchronize: true,
    }),
    CategoriesModule,
    AuthorsModule,
    UsersModule,
    BannersModule,
    AuthModule,
    PublisherModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
