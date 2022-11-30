import Redis, { RedisOptions } from 'ioredis';

import variables from 'src/variables';

let redis;

if (!variables.isTest) {
  let config: RedisOptions;

  if (variables.isProduction) {
    config = {
      port: variables.REDIS_PORT,
      host: variables.REDIS_HOST,
      password: variables.REDIS_PASSWORD,
    };
  }

  redis = new Redis(config);
}

export default redis;
