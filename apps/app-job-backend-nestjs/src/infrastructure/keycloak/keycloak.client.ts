import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import keycloakConfig from '../../environment/keycloak.config';

export type AccessToken = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  id_token: string;
  session_stage: string;
  scope: string;
  jit: string;
};

@Injectable()
export class KeycloakClient {
  constructor(
    @Inject(keycloakConfig.KEY)
    private config: ConfigType<typeof keycloakConfig>,
    private readonly http: HttpService,
  ) {
    console.log(`keycloakConfig = ${this.config}`);
  }

  loginForToken(username: string, password: string): Observable<AccessToken> {
    const accessToken = new Subject<AccessToken>();
    this.http
      .post(this.config.authServerUrl, {
        data: {
          grant_type: 'password',
          client_id: this.config.clientId,
          client_secret: this.config.secret,
          scope: 'email openid',
          username,
          password,
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          accessToken.next(axiosResponse.data);
        }),
      );
    return accessToken;
  }
}
