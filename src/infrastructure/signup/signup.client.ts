import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SignupClient {
  private readonly SIGNUP_URL = 'http://localhost:8080/api/signup';

  constructor(private readonly http: HttpService) {}

  findAll(): Observable<Array<SignupDomain>> {
    return this.http.get(this.SIGNUP_URL).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }
}
