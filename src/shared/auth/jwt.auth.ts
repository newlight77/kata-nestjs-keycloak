import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role, ROLES_KEY } from './role.model';
import axios from 'axios';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    //console.info('JwtAuthGuard headers', request.headers);
    const authorization = request.headers['authorization'];

    if (authorization !== '') {
      const token = authorization.split(' ');
      console.info('JwtAuthGuard token', token[1]);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token[1]}`;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    //const { user } = context.switchToHttp().getRequest();
    //console.info('RolesGuard user', user);
    //return requiredRoles.some((role) => user.roles?.includes(role));

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
