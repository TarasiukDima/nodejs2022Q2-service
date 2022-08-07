import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './validations/customValidationPipe';
import { LoggingService } from './modules/logger/logging.service';
import { UNCAUGHT_ERROR, UNHANDLED_ERROR } from './settings/messages';
import { getErrorMessage } from './utils/index';
import { PORT } from './settings/index';

process.on('uncaughtException', (error: Error) => {
  const loggingService = new LoggingService();
  const message = getErrorMessage(UNCAUGHT_ERROR, error);
  loggingService.error(message);
});

process.on('unhandledRejection', (error: Error) => {
  const loggingService = new LoggingService();
  const message = getErrorMessage(UNHANDLED_ERROR, error);
  loggingService.error(message);
});

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const rootDirname = dirname(__dirname);
  const docFile = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(docFile);

  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new CustomValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
};

bootstrap();
