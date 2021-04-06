import { Injectable } from '@nestjs/common';
import { SignupAdapter } from '../../infrastructure/signup/signup.adapter';
import { SignupPort } from './signup.port';

@Injectable()
export class SignupService {

  constructor(private adapter: SignupPort) {}

  create(): string {
    return this.adapter.save();
  }
}
