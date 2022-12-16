import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  getCategory() {
    return { message: 'Success', data: { result: 'Service' } };
  }
}
