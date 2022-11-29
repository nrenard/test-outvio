import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RateLimitEnum, RATE_LIMIT_KEY } from 'src/decorators';
import { mapLimitRate, cache } from 'src/utils/cache';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const rateLimitType = this.reflector.getAllAndOverride<RateLimitEnum>(
      RATE_LIMIT_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rateLimitType) return true;

    let keyRedis = 'rate-limit:';

    const setRedisKey = {
      [RateLimitEnum.IP]: () => {
        const { ip, method, originalUrl } = req;
        keyRedis += `${ip}-${method}-${originalUrl}`;
      },
      [RateLimitEnum.TOKEN]: () => {
        const { authorization } = req.headers;
        const [, token] = authorization.split(' ');
        keyRedis += token;
      },
    };

    setRedisKey[rateLimitType]();

    const response = await cache.get(keyRedis);
    const responseNumber = Number(response);

    const limitRate = mapLimitRate[rateLimitType];

    if (response) {
      if (responseNumber >= limitRate) {
        const duration = await cache.takeDuration(keyRedis);

        let messageTime =
          'You have reached the request limit, your requests will be unlocked in ';

        for (const key in duration) {
          const value = duration[key];

          if (value) messageTime += `${value}${key[0]}`;
        }

        throw new HttpException(messageTime, HttpStatus.TOO_MANY_REQUESTS);
      }

      const value = responseNumber + 1;
      await cache.set({ key: keyRedis, value });
    } else {
      await cache.set({ key: keyRedis, value: 1 });
    }

    return true;
  }
}
