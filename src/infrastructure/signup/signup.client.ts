import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupClient {

  findAll(): string {
    return 'found all';
  }
}
