import { Observable } from 'rxjs';
import { SignupDomain } from './signup.domain';

abstract class SignupPort {
  abstract save(): string;
  abstract find(): Observable<SignupDomain>;
  abstract findAll(): Observable<Array<SignupDomain>>;
}

export { SignupPort };
