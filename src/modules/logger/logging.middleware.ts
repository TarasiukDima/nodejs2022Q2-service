import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new LoggingService();

  use(
    { body, method, originalUrl: url, query }: Request,
    response: Response,
    next: NextFunction,
  ): void {
    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(
        `Url: ${url},\nQuery params: ${JSON.stringify(
          query,
        )},\nBody: ${JSON.stringify(
          body,
        )},\nStatus code: ${statusCode},\nMethod: ${method},\nTime: ${Date.now()}\n\n`,
      );
    });

    next();
  }
}
