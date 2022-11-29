import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate-limit';

export enum RateLimitEnum {
  IP = 'ip',
  TOKEN = 'token',
}

export const RateLimitDecorator = (type: RateLimitEnum) =>
  SetMetadata(RATE_LIMIT_KEY, type);
