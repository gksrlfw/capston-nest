import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

/**
 * TODO origin 에 regex 처리
 */
export const CORS_OPTIONS: CorsOptions = {
  // TODO 임시로 풀어놓음
  // origin: ['http://dev-eims.solarconnect.kr', 'https://dev-eims.solarconnect.kr'],
  credentials: true,
};
