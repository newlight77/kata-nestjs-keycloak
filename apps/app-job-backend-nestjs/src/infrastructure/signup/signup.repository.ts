import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupRepository {
  findAll(): string {
    return 'found all';
  }
}
