import 'dotenv/config';

export const PORT = Number(process.env.PORT) || 5000;
export const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 5;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_string';
export const JWT_SECRET_REFRESH_KEY =
  process.env.JWT_SECRET_REFRESH_KEY || 'secret_string';
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '5h';
export const TOKEN_REFRESH_EXPIRE_TIME =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '5h';
