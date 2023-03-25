import { Controller, Get, Post } from '@nestjs/common';
import { SignupService } from '../../core/domain/signup/signup.service';

import { Roles, Scopes, Public, RoleMatchingMode } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('signup')
export class SignupController {
  constructor(private readonly appService: SignupService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Fin all signups' })
  @ApiResponse({ status: 200, description: 'Singups found' })
  async findAll() {
    return await this.appService.findAll();
  }

  @Roles({ roles: ['admin', 'realm:sysadmin'], mode: RoleMatchingMode.ALL })
  @Scopes('edit', 'create')
  @Post()
  @ApiOperation({ summary: 'New signup' })
  @ApiResponse({ status: 201, description: 'Successfully siggned up' })
  create(): string {
    return this.appService.create();
  }

  @Roles({ roles: ['user', 'other'] })
  @Scopes('view')
  @Get(':id')
  @ApiOperation({ summary: 'Find a signup by username' })
  @ApiResponse({ status: 201, description: 'Successfully siggned up' })
  async find() {
    console.info('api find all');
    return await this.appService.find();
  }
}
