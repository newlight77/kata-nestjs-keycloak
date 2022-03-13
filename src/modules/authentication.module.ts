import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../infrastructure/auth/jwt.auth';

import { KeycloakConfigService } from '../environment/keycloak.config';
import { ConfigModule } from './config.module';

@Module({
  imports: [
    HttpModule,
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useExisting: KeycloakConfigService,
    }),
  ],
  providers: [
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and
    // methods with @Scopes
    // are handled by this guard.
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthenticationModule {}
