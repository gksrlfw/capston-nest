import { ScResponseExceptionDto } from '@common/dto/response';
import Time from '@common/time';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '@src/logger/logger.service';
import { Request, Response } from 'express';

/**
 * 모든 exception 을 catch 합니다.
 * global 로 filter 로 등록되어있습니다.
 * app.module 을 참조하세요.
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(this.constructor.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    this.logger.error(exception);

    // http exception 이 아닐경우, 500 error 로 변환후 반환합니다.
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const isHttpException = exception instanceof HttpException;

    if (isHttpException) {
      response.status(status).json({
        statusCode: status,
        message: (exception as HttpException)?.message || 'UnknownError',
        path: request.url,
        datetime: Time.now().toString(),
      } as ScResponseExceptionDto);
      return;
    }

    response.status(status).json({
      statusCode: status,
      message: exception,
      path: request.url,
      datetime: Time.now().toString(),
    } as ScResponseExceptionDto);
  }
}
