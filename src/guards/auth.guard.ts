import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AUTH_KEY } from 'src/decorators';
import variables from 'src/variables';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    const isAuth = this.reflector.getAllAndOverride<string[]>(AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isAuth) {
      if (!authorization) {
        throw new UnauthorizedException('Token not provided');
      }

      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Token badly formatted');
      }

      if (token !== variables.STATIC_JWT) {
        throw new UnauthorizedException('Token not authorized');
      }
    }

    return true;
  }
}
