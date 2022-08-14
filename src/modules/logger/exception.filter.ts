import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ERROR_SERVER } from '../../settings/messages';
import { getLoggingMessage } from '../../utils/index';
import {
  CustomHTTPExceptionResponse,
  HTTPExceptionResponse,
} from '../../types/index';
import { LoggingService } from './logging.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private loggingService: LoggingService;

  constructor() {
    this.loggingService = new LoggingService();
  }

  private getErrorData = async (
    statusCode: number,
    error: string,
    { path, method }: Request,
  ): Promise<CustomHTTPExceptionResponse> => {
    return {
      statusCode,
      error,
      path,
      method,
      timestamp: new Date(),
    };
  };

  catch = async (exception: unknown, host: ArgumentsHost): Promise<any> => {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { path, query, body, method } = request;

    let status: HttpStatus;
    let errorMessage: string;
    let stack = '';

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as HTTPExceptionResponse;
      status = exception.getStatus();
      errorMessage = errorResponse.error || exception.message;
      stack = exception.stack;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = ERROR_SERVER;
    }

    const responseError = await this.getErrorData(
      status,
      errorMessage,
      request,
    );
    const messageForLogging = getLoggingMessage(
      { path, query, body, method, status },
      stack,
    );

    this.loggingService.error(messageForLogging);
    response.status(status).json(responseError);
  };
}
