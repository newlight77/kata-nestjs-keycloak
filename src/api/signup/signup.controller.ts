import { Controller, Get, Post } from '@nestjs/common';
import { SignupService } from '../../domain/signup/signup.service';

import { Roles, Scopes, Public, RoleMatchingMode } from 'nest-keycloak-connect';

@Controller('signup')
export class SignupController {
  constructor(private readonly appService: SignupService) {}

  @Get()
  @Public()
  async findAll() {
    return await this.appService.findAll();
  }

  @Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
  @Scopes('edit', 'create')
  @Post()
  create(): string {
    return this.appService.create();
  }

  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  @Get()
  async find() {
    console.info('api find all');
    return await this.appService.find();
  }
}
