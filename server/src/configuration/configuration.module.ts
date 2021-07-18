import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// local 이거나 undefined 일 때만 false 여야합니다.
const shouldIgnoreEnvFile = (): boolean => ![undefined, 'local'].includes(process.env.APP_ENV);

// .env* 파일에 APP_ENV 가 설정되어있더라도, 이 시점에는 해당 파일을 참조하기 전이므로 어떠한 값도 설정되어있지 않습니다.
// .env* file path
// when APP_ENV is undefined, .env
// when APP_ENV is local, .env.local
// when APP_ENV is dev, .env.dev
// when APP_ENV is prod, .env.prod
// 하지만 shouldIgnoreEnvFile is true, 사용되지 않습니다.
const getEnvFilePath = (): string => ['.env', process.env.APP_ENV].filter((item) => item !== undefined).join('.');

console.log(
  `APP_ENV: ${process.env.APP_ENV}, shouldIgnoreEnvFile: ${shouldIgnoreEnvFile()}, getEnvFilePath: ${getEnvFilePath()}`,
);

@Module({
  imports: [
    // .env 에 정의된 환경변수를 application 에서 사용할 수 있도록 설정합니다.
    ConfigModule.forRoot({
      isGlobal: true,
      // local 이거나 undefined 일 때만 false 여야합니다.
      ignoreEnvFile: shouldIgnoreEnvFile(),
      // .env 를 기본값으로하며, APP_ENV 가 있는 경우, 그에 알맞는 .env.<APP_ENV> 파일을 사용합니다.ex) .env.dev
      // 단 local 의 경우는 .env 를 사용합니다.
      envFilePath: getEnvFilePath(),
    }),
  ],
})
export class ConfigurationModule {}
