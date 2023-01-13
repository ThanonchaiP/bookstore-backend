import { PartialType } from '@nestjs/swagger';
import { Author } from 'src/authors/entities/author.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  readonly author?: Author;
  readonly publisher?: Publisher;
}
