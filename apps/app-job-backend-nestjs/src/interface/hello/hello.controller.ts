import { Controller, Get } from '@nestjs/common';

import { AuthenticatedUser, Public, Resource } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('hello')
@Resource('hello')
@ApiTags('hello')
export class HelloController {
  @Get()
  @Public(false)
  @ApiOperation({ summary: 'Hello!' })
  @ApiResponse({ status: 200, description: 'Hello API' })
  getHello(@AuthenticatedUser() user: any): string {
    if (user) {
      return `Hello ${user.preferred_username}, the application is running!`;
    } else {
      return 'Hello, the application is running! :)';
    }
  }
}
