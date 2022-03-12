import { Controller, Get } from '@nestjs/common';

import { Public } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Public()
@Controller('hello')
export class HelloController {
  @Get()
  @ApiOperation({ summary: 'Hello!' })
  @ApiResponse({ status: 200, description: 'Hello API' })
  hello(): string {
    return 'Hello, the application is running! :)';
  }
}
