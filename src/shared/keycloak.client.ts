import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import keycloakConfig from 'src/environment/keycloak.config';

@Injectable()
export class KeycloakClient {
  constructor(
    @Inject(keycloakConfig.KEY)
    private config: ConfigType<typeof keycloakConfig>,
    private readonly http: HttpService,
  ) {
    console.log(`keycloakConfig = ${this.config}`);
  }

  token(): Observable<string> {
    const accessToken = new Subject<string>();
    this.http
      .post(this.config.authServerUrl, {
        data: {
          grant_type: 'password',
          client_id: this.config.clientId,
          client_secret: this.config.secret,
          // scope: this.config.scope,
          // username: this.config.username,
          // password: this.config.password,
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          accessToken.next(axiosResponse.data.access_token);
        }),
      );
    return accessToken;
  }
}
