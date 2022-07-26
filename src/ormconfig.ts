import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
} from './settings/index';

export const commonOptions = {
  type: 'postgres',
  host: TYPEORM_HOST,
  port: TYPEORM_PORT,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  migrationsRun: true,
  synchronize: false,
  logging: true,
};

export const dataSourceConfig = {
  ...commonOptions,
  entities: ['dist/**/entities/*.entity.{ts,js}'],
  migrations: ['src/migration/*.{ts,js}'],
} as DataSourceOptions;

export const typeormConfig = {
  ...commonOptions,
  entities: [__dirname + '/**/entities/*.entity.{ts,js}'],
  migrations: [__dirname + './migration/*.{ts,js}'],
  retryAttempts: 10,
} as TypeOrmModuleOptions;
