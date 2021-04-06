import { Controller, Get } from '@nestjs/common';
import { AppService } from '../domain/app.service';

import { Unprotected } from 'nest-keycloak-connect';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Unprotected()
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
