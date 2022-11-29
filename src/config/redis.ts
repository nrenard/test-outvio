import Redis from 'ioredis';

import variables from 'src/variables';

const isTest = variables.NODE_ENV === 'test';

let redis;

if (!isTest) {
  redis = new Redis();
}

export default redis;
