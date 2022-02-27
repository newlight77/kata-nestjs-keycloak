import { Injectable } from '@nestjs/common';
import { SignupPort } from '../../domain/signup/signup.port';
import { SignupDomain } from '../../domain/signup/signup.domain';
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

  find(): Observable<SignupDomain> {
    return this.client.find();
  }

  findAll(): Observable<Array<SignupDomain>> {
    return this.client.findAll();
  }
}
