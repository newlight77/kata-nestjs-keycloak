import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import coreConfig from '../../environment/core.config';
import axios from 'axios';
import { SignupDomain } from 'src/domain/signup/signup.domain';

@Injectable()
export class SignupClient {
  constructor(
    @Inject(coreConfig.KEY)
    private config: ConfigType<typeof coreConfig>,
    private readonly http: HttpService,
  ) {
    console.log(`coreApiUrl = ${this.config.coreApiUrl}`);
  }

  find(): Observable<SignupDomain> {
    console.info('axios.defaults.headers', axios.defaults.headers);
    const url = this.config.coreApiUrl + '/signup';
    console.info('calling url', url);
    return this.http.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  findAll(): Observable<Array<SignupDomain>> {
    console.info('axios.defaults.headers', axios.defaults.headers);
    const url = this.config.coreApiUrl + '/signup/list';
    console.info('calling url', url);
    return this.http.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }
}
