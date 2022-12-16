import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const { name, email, address } = createAuthorDto;

    const author = new Author();
    author.name = name;
    author.email = email;
    author.address = address;

    await this.authorsRepository.save(author);
    return { statusCode: 201, message: 'Success', data: author };
  }

  async findAll() {
    const authors = await this.authorsRepository.find();
    return { data: authors };
  }

  async findOne(id: string) {
    return await this.authorsRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    await this.authorsRepository.update(id, updateAuthorDto);
    return { message: 'Success' };
  }

  async remove(id: string) {
    const author = await this.findOne(id);
    if (!author) throw new HttpException('Not found', HttpStatus.BAD_REQUEST);

    await this.authorsRepository.delete(id);
    return { message: 'Success' };
  }
}
