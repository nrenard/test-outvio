const STATIC_JWT = process.env.STATIC_JWT;

const PORT = parseInt(process.env.PORT, 10) || 3000;
const NODE_ENV = process.env.NODE_ENV;

const PUBLIC_LIMIT_RATE = parseInt(process.env.PUBLIC_LIMIT_RATE, 10) || 100;
const PRIVATE_LIMIT_RATE = parseInt(process.env.PRIVATE_LIMIT_RATE, 10) || 200;

export default {
  STATIC_JWT,
  PORT,
  PUBLIC_LIMIT_RATE,
  PRIVATE_LIMIT_RATE,
  NODE_ENV,
};
