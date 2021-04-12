import { SignupClient } from './infrastructure/signup/signup.client';
import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './domain/app.service';

import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { SignupController } from './api/signup/signup.controller';
import { SignupService } from './domain/signup/signup.service';
import { SignupAdapter } from './infrastructure/signup/signup.adapter';
import { SignupPort } from './domain/signup/signup.port';
import { SignupRepository } from './infrastructure/signup/signup.repository';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './environment/db.config';
import coreConfig from './environment/core.config';
import { JwtAuthGuard } from './shared/auth/jwt.auth';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: 'config/.env',
      load: [dbConfig, coreConfig],
      isGlobal: true,
    }),
    KeycloakConnectModule.register({
      authServerUrl: process.env.AUTH_SERVER_URL,
      realm: process.env.REALM,
      clientId: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET,
      cookieKey: 'KEYCLOAK_JWT',
    }),
  ],
  controllers: [AppController, SignupController],
  providers: [
    AppService,
    SignupService,
    SignupClient,
    SignupRepository,
    { provide: SignupPort, useClass: SignupAdapter },
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
export class AppModule {}
