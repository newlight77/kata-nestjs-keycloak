import { Controller, Get, Post } from '@nestjs/common';
import { SignupService } from '../../domain/signup/signup.service';

import { Roles, AllowAnyRole } from 'nest-keycloak-connect';
import { Observable } from 'rxjs';

@Controller('signup')
export class SignupController {
  constructor(private readonly appService: SignupService) {}

  @Roles('user')
  @Post()
  create(): string {
    return this.appService.create();
  }

  @AllowAnyRole()
  @Get()
  findAll(): Observable<Array<SignupDomain>> {
    console.info('api find all');
    return this.appService.findAll();
  }
}
