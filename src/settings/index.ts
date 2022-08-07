import { LogLevel } from '@nestjs/common';
import 'dotenv/config';
import { RelationOptions } from 'typeorm';
import { LOGGING_VARIANTS } from '../types/index';

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

export const IS_PUBLIC_KEY = 'isPublic';

export const BYTES_IN_KB = 1024;
export const MAX_FILE_SIZE_KB = +process.env.MAX_FILE_SIZE_KB || 1;
export const LOGGING_LEVEL = +process.env.LOGGING_LEVEL || 2;
export const LOGGING_VARIANTS_ARRAY = Object.keys(LOGGING_VARIANTS).slice(
  0,
  LOGGING_LEVEL,
) as Array<LogLevel>;
