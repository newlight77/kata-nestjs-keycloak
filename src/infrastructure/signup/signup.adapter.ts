import { Injectable } from '@nestjs/common';
import { SignupPort } from '../../domain/signup/signup.port';
import { SignupClient } from './signup.client';
import { Observable } from 'rxjs';
import { SignupRepository } from './signup.repository';

@Injectable()
export class SignupAdapter extends SignupPort {
  constructor(
    private readonly repository: SignupRepository,
    private readonly client: SignupClient,
  ) {
    super();
  }

  save(): string {
    return 'saved';
  }

  find(): string {
    return 'found one';
  }

  findAll(): Observable<Array<SignupDomain>> {
    return this.client.findAll();
  }
}
