import { SignupClient } from '../infrastructure/signup/signup.client';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SignupController } from '../api/signup/signup.controller';
import { SignupService } from '../domain/signup/signup.service';
import { SignupAdapter } from '../infrastructure/signup/signup.adapter';
import { SignupPort } from '../domain/signup/signup.port';
import { SignupRepository } from '../infrastructure/signup/signup.repository';

@Module({
  imports: [HttpModule],
  controllers: [SignupController],
  providers: [
    SignupService,
    SignupClient,
    SignupRepository,
    { provide: SignupPort, useClass: SignupAdapter },
  ],
})
export class SignupComponentModule {}
