import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CORS_OPTIONS } from '@src/constants';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
// import * as cookieParser from 'cookie-parser';
// fixme 이렇게 안하고도 가능할텐데 ...
import './common/string';

const logger: Logger = new Logger('MAIN');

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(process.env.APP_NAME),
  });

  // https://github.com/expressjs/cookie-parser#readme
  // app.use(cookieParser());
  // https://github.com/expressjs/csurf#csurf
  // app.use(csrf({ cookie: true }));

  // whitelist : 요청 시, dto에 들어 있는 속성에 없는 값이 들어오면 자동으로 제거된다
  // forbidNonWhitelisted를 하면 whitelist에 대한 에러를 발생시켜 준다   
  // transform: 입력값이 number면 원래는 서버에서는 string으로 받는다 -> 이를 원했던 타입으로 바꿔준다
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  app.setGlobalPrefix('/api');

  // security 와 롼련된 내용입니다. xss, csrf 와 관련된 취약점 보완이 필요할 경우 아래를 참조하세요.
  // https://github.com/helmetjs/helmet
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  app.enableCors(CORS_OPTIONS);

  const port = process.env.APP_PORT || 3000;

  await app.listen(port, () => {
    logger.log(`Server is listening on port :${port}`);
  });
};

(async () => {
  await bootstrap();
})();
