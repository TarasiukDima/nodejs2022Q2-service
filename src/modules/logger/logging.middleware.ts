import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getLoggingMessage } from '../../utils/index';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private loggingService: LoggingService;

  constructor() {
    this.loggingService = new LoggingService();
  }

  use(
    { body, method, originalUrl: url, query }: Request,
    response: Response,
    next: NextFunction,
  ): void {
    response.on('finish', () => {
      const { statusCode } = response;

      const messageForLogging = getLoggingMessage({
        path: url,
        query,
        body,
        method,
        status: statusCode,
      });

      this.loggingService.log(messageForLogging);
    });

    next();
  }
}
