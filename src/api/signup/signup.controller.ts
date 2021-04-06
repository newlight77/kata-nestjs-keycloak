import { Controller, Get, Post } from '@nestjs/common';
import { SignupService } from '../../domain/signup/signup.service';

import { Roles, AllowAnyRole } from 'nest-keycloak-connect';

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
  find(): string {
    return this.appService.find();
  }
}
