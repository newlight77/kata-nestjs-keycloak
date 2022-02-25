import { Injectable } from '@nestjs/common';
import { SignupPort } from './signup.port';
import { Observable } from 'rxjs';

@Injectable()
export class SignupService {
  constructor(private adapter: SignupPort) {}

  create(): string {
    return this.adapter.save();
  }

  find(): Observable<SignupDomain> {
    return this.adapter.find();
  }

  findAll(): Observable<Array<SignupDomain>> {
    return this.adapter.findAll();
  }
}
