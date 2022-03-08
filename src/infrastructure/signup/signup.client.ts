import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import backendConfig from '../../environment/backend.config';
import axios from 'axios';
import { SignupDomain } from '../../core/domain/signup/signup.domain';

@Injectable()
export class SignupClient {
  constructor(
    @Inject(backendConfig.KEY)
    private config: ConfigType<typeof backendConfig>,
    private readonly http: HttpService,
  ) {
    console.log(`backendApiUrl = ${this.config.backendApiUrl}`);
  }

  find(): Observable<SignupDomain> {
    console.info('axios.defaults.headers', axios.defaults.headers);
    const url = this.config.backendApiUrl + '/signup';
    console.info('calling url', url);
    return this.http.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  findAll(): Observable<Array<SignupDomain>> {
    console.info('axios.defaults.headers', axios.defaults.headers);
    const url = this.config.backendApiUrl + '/signup/list';
    console.info('calling url', url);
    return this.http.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }
}
