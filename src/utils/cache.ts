import redis from 'src/config/redis';
import { intervalToDuration } from 'date-fns';

import { RateLimitEnum } from 'src/decorators';
import variables from 'src/variables';

export const mapLimitRate = {
  [RateLimitEnum.IP]: variables.PUBLIC_LIMIT_RATE,
  [RateLimitEnum.TOKEN]: variables.PRIVATE_LIMIT_RATE,
};

interface ISet {
  key: string;
  value: number | string;
  ttl?: number;
}

const set = ({ key, value, ttl = 3600 }: ISet) =>
  redis.set(key, value, 'EX', ttl);

const get = (key: string) => redis.get(key);

const takeDuration = async (key: string) => {
  const seconds = await redis.ttl(key);
  return intervalToDuration({ start: 0, end: seconds * 1000 });
};

export const cache = { set, get, takeDuration };
