import { HttpStatus } from '@nestjs/common';

/**
 *
 */
export abstract class ScResponseDto {
  // 상태코드
  statusCode: number;

  // 오류내용
  message: string;

  protected constructor(statusCode: HttpStatus, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 *
 */
export class ScResponseSuccessDto<ResponseData> extends ScResponseDto {
  readonly data?: ResponseData;

  constructor(data?: ResponseData, message = 'OK', statusCode: HttpStatus = HttpStatus.OK) {
    super(statusCode, message);
    this.data = data;
  }
}

/**
 *
 */
export class ScResponseExceptionDto extends ScResponseDto {
  path: string;

  datetime: string;

  constructor(statusCode: HttpStatus, message: string, path: string, datetime: string) {
    super(statusCode, message);
    this.path = path;
    this.datetime = datetime;
  }
}
