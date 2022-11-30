const STATIC_JWT = process.env.STATIC_JWT;

const PORT = parseInt(process.env.PORT, 10) || 3000;
const NODE_ENV = process.env.NODE_ENV;

const PUBLIC_LIMIT_RATE = parseInt(process.env.PUBLIC_LIMIT_RATE, 10) || 100;
const PRIVATE_LIMIT_RATE = parseInt(process.env.PRIVATE_LIMIT_RATE, 10) || 200;
const DEFAULT_TIME_LIMIT_RATE =
  parseInt(process.env.DEFAULT_TIME_LIMIT_RATE, 10) || 3600;

const REDIS_PORT = parseInt(process.env.REDIS_PORT, 10) || 6379;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

export default {
  NODE_ENV,
  isProduction,
  isTest,

  PORT,

  STATIC_JWT,

  PUBLIC_LIMIT_RATE,
  PRIVATE_LIMIT_RATE,
  DEFAULT_TIME_LIMIT_RATE,

  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
};
