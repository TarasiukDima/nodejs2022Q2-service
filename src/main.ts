import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const rootDirname = dirname(__dirname);
  const docFile = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(docFile);

  SwaggerModule.setup('doc', app, document);
  await app.listen(4000);
};

bootstrap();
