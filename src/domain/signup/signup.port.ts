import { Observable } from 'rxjs';
abstract class SignupPort {
  abstract save(): string;
  abstract find(): string;
  abstract findAll(): Observable<Array<SignupDomain>>;
}

export { SignupPort };
