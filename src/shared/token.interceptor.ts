import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Keycloak, GrantManager, Grant } from 'keycloak-connect';

import { KEYCLOAK_INSTANCE } from 'nest-keycloak-connect';
import { Inject } from '@nestjs/common';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(
    @Inject(KEYCLOAK_INSTANCE)
    private keycloak: Keycloak,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    return next.handle().pipe(tap(() => this.handleRequest(context)));
  }

  private handleRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (context.getType() === 'http') {
      console.info('interceptor headers', request.headers);
      console.info(
        'interceptor authorization',
        request.header('Authorization'),
      );
      axios.defaults.headers.common['Authorization'] = 'Bearer tototototo';
    }
  }
}
