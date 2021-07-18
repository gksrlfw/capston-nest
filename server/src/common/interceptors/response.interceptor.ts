import { ScResponseDto, ScResponseSuccessDto } from '@common/dto/response';
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ScResponseSuccessDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ScResponseDto> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          const httpStatus = HttpStatus.NO_CONTENT;
          return new ScResponseSuccessDto(httpStatus, HttpStatus[httpStatus], data);
        }

        let httpStatus = HttpStatus.OK;
        const statusCode = context.switchToHttp().getResponse<Response>().statusCode;
        if (statusCode === HttpStatus.CREATED) {
          httpStatus = statusCode;
        }
        return new ScResponseSuccessDto(data, HttpStatus[httpStatus], httpStatus);
      }),
    );
  }
}
