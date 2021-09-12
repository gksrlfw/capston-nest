import {
  Logger,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigurationModule } from '@src/configuration/configuration.module';
import { DatabaseModule } from '@src/database/database.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ApartsModule } from './modules/aparts/aparts.module';
import { AllExceptionFilter } from './common/filters/exception.filter';
import { EntityTestModule } from './modules/entity-test/entity-test.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LoggerModule,
    UsersModule,
    AuthModule,
    ApartsModule,
    EntityTestModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    }
  ]
})
export class AppModule implements OnApplicationBootstrap, OnModuleInit, OnModuleDestroy, OnApplicationShutdown {
  private readonly logger: Logger = new Logger();

  constructor(private readonly configService: ConfigService) {
    this.logger.debug(`${this.constructor.name} 이 생성되었습니다.`);

    const timezone = this.configService.get<string>('APP_TIMEZONE', 'Asia/Seoul');

    this.logger.log(`APP_TIMEZONE 은 ${timezone} 입니다.`);
  }

  /**
   * 모듈이 초기화된 후 수행해야할 동작이 있다면 여기에 작성하세요.
   */
  onModuleInit(): any {
    this.logger.debug(`onModuleInit 이 호출되었습니다.`);
  }

  /**
   * 모든 modules 가 load 되고 사용할 준비가된 후 수행해야할 동작이 있다면 여기에 작성하세요.
   */
  onApplicationBootstrap(): any {
    this.logger.debug(`onApplicationBootstrap 이 호출되었습니다.`);
  }

  /**
   *
   */
  onModuleDestroy(): any {
    this.logger.debug(`onModuleDestroy 이 호출되었습니다.`);
  }

  /**
   *
   * @param signal
   */
  onApplicationShutdown(signal?: string): any {
    this.logger.debug(`onApplicationShutdown(${signal}) 이 호출되었습니다.`);
    this.logger.error(
      `문제가 발생했기때문에 application 을 종료합니다. --watch option 을 사용한 경우 application 이 종료되지 않을 수 있습니다.`,
    );
  }
}

/*

mutation {
  # createOwner(input: { username: "z" }) {
  #   id
  # }
  createPost (input: { 
    title: "post입니다", 
    body: "body입니다", 
    ownerId: 1, 
    menus: {
      name: "메뉴",
      price: 1000,
      subMenus: {
        name: "서브메뉴",
        price: 2000
      }
    }}) {  
    title,
    body,
#     menus {
#       name
#       price
      
#     }
  }
}

*/
