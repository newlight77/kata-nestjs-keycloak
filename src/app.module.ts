import { SignupClient } from './infrastructure/signup/signup.client';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

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
import { JwtAuthGuard } from './auth/jwt.auth';
import { DatabaseModule } from './infrastructure/database.module';

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
    DatabaseModule,
  ],
  controllers: [SignupController],
  providers: [
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
