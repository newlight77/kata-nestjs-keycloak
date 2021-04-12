import { ExecutionContext, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CanActivate } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const authorization = request.headers['authorization'];

    if (authorization !== '') {
      const token = authorization.split(' ');
      //console.info('JwtAuthGuard token', token[1]);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token[1]}`;
    }

    return true;
  }
}
