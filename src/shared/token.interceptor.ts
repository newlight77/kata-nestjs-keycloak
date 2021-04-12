import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import axios from 'axios';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    return next.handle().pipe(tap(() => this.handleRequest(context)));
  }

  private handleRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (context.getType() === 'http') {
      //console.info('interceptor headers', request.headers);
      axios.defaults.headers.common['Authorization'] = 'Bearer tototototo';

      const authorization = request.headers['authorization'];

      if (authorization !== '') {
        const token = authorization.split(' ');
        console.info('TokenInterceptor token', token[1]);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token[1]}`;
      }
    }
  }
}
