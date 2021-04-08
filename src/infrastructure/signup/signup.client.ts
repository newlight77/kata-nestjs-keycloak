import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import coreConfig from 'src/environment/core.config';

@Injectable()
export class SignupClient {
  constructor(
    @Inject(coreConfig.KEY)
    private config: ConfigType<typeof coreConfig>,
    private readonly http: HttpService,
  ) {
    console.log(`coreApiUrl = ${this.config.coreApiUrl}`);
  }

  findAll(): Observable<Array<SignupDomain>> {
    return this.http.get(this.config.coreApiUrl).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }
}
