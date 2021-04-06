import { Injectable } from '@nestjs/common';
import { SignupPort } from './signup.port';

@Injectable()
export class SignupService {

  constructor(private adapter: SignupPort) {}

  create(): string {
    return this.adapter.save();
  }
  
  find(): string {
    return this.adapter.find();
  }
}
