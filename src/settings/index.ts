import 'dotenv/config';
import { RelationOptions } from 'typeorm';

export const PORT = Number(process.env.PORT) || 4000;
export const CRYPT_SALT = Number(process.env.CRYPT_SALT) || 5;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret_string';
export const JWT_SECRET_REFRESH_KEY =
  process.env.JWT_SECRET_REFRESH_KEY || 'secret_string';
export const TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
export const TOKEN_REFRESH_EXPIRE_TIME =
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '5h';

export const VERSION_UUID = '4';
export const ID_ENTITY_OPTIONS = {
  onDelete: 'SET NULL',
  nullable: true,
} as RelationOptions;
export const FAVORITES_ENTITY_OPTIONS = {
  eager: true,
} as RelationOptions;

export const TYPEORM_PORT = +process.env.POSTGRES_PORT || 5432;
export const TYPEORM_HOST = process.env.POSTGRES_HOST || 'localhost';
export const TYPEORM_DATABASE = process.env.POSTGRES_DB || 'POSTGRES_DB';
export const TYPEORM_USERNAME = process.env.POSTGRES_USER || 'POSTGRES_USER';
export const TYPEORM_PASSWORD =
  process.env.POSTGRES_PASSWORD || 'POSTGRES_PASSWORD';
