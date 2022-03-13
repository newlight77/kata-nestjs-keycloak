import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import {
  KeycloakConnectOptions,
  KeycloakConnectOptionsFactory,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';

dotenv.config({ path: __dirname + '/../../config/keycloak.env' });

console.log(`AUTH_SERVER_URL : ${process.env.AUTH_SERVER_URL}`);
console.log(`REALM : ${process.env.REALM}`);
console.log(`CLIENT_ID : ${process.env.CLIENT_ID}`);
console.log(`CLIENT_SECRET : ${process.env.CLIENT_SECRET}`);

export default registerAs('keycloak', () => ({
  authServerUrl: process.env.AUTH_SERVER_URL,
  realm: process.env.REALM,
  bearerOnly: true,
  clientId: process.env.CLIENT_ID,
  secret: process.env.CLIENT_SECRET,
  cookieKey: 'KEYCLOAK_JWT',
  logLevels: ['verbose'],
  useNestLogger: false,
  policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
  tokenValidation: TokenValidation.ONLINE,
  verifyTokenAudience: false,
}));

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {
  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: process.env.AUTH_SERVER_URL,
      realm: process.env.REALM,
      bearerOnly: true,
      clientId: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      cookieKey: 'KEYCLOAK_JWT',
      logLevels: ['verbose'],
      useNestLogger: false,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
      verifyTokenAudience: false,
    };
  }
}
