import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { PORT } from './settings/index';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const rootDirname = dirname(__dirname);
  const docFile = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(docFile);

  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
};

bootstrap();
