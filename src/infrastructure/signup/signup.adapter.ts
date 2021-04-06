import { Injectable } from '@nestjs/common';
import { SignupPort } from '../../domain/signup/signup.port';

@Injectable()
export class SignupAdapter extends SignupPort {
  save(): string {
    return 'saved';
  }

  find(): string {
    return 'found one';
  }
}
