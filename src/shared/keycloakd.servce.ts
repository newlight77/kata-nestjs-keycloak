import {
  Injectable,
  Inject,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Keycloak, GrantManager, Grant } from 'keycloak-connect';

export type KeycloakedRequest<T = Request> = {
  access_token: string;
  grant: Grant | undefined;
} & T;

export interface KeycloakOptions {
  authServerUrl: string;
  secret: string;
  clientId: string;
  realm: string;
}

@Injectable({ scope: Scope.REQUEST })
export class KeycloakService {
  constructor(
    @Inject('KEYCLOAK_INSTANCE') private keycloak: Keycloak,
    @Inject('KEYCLOAK_CONNECT_OPTIONS') private options: KeycloakOptions,
    @Inject(REQUEST) private request: KeycloakedRequest<Request>,
  ) {}

  postForAccessToken(): string {
    try {
      console.log('postForAccessToken');
      return '';
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return '';
  }
}
