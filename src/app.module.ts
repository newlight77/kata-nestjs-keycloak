import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import dbConfig from './environment/db.config';
import coreConfig from './environment/core.config';
import { DatabaseModule } from './modules/database.module';
import { AuthenticationModule } from './modules/authentication.module';
import { SignupComponentModule } from './modules/signup.component.module';
import { JobComponentModule } from './modules/job.component.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'config/.env',
      load: [dbConfig, coreConfig],
      isGlobal: true,
    }),
    AuthenticationModule,
    //DatabaseModule,
    SignupComponentModule,
    //JobComponentModule,
  ],
})
export class AppModule {}
