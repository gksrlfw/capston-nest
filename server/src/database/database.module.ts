import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Connection, getConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // AppModule 에서 global 로 설정되어있기 때문에 이렇게 inject 가 가능합니다.
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const appEnv = configService.get<string>('APP_ENV', 'local');
        const shouldDebug = appEnv !== 'prod';

        const databaseHostForMaster = configService.get<string>('DATABASE_HOST_MASTER', 'localhost');
        const databasePortForMaster = configService.get<number>('DATABASE_PORT_MASTER', 3306);
        const databaseUserForMaster = configService.get<string>('DATABASE_USER_MASTER', 'root');
        const databaseUserPasswordForMaster = configService.get<string>('DATABASE_USER_PASSWORD_MASTER', '');

        const databaseName = configService.get<string>('DATABASE_NAME', 'recommend');

        const shouldSynchronize = configService.get<boolean>('SHOULD_SYNCHRONIZE_DATABASE', false);
        const shouldMigrate = configService.get<boolean>('SHOULD_MIGRATE_DATABASE', false);

        console.log(`shouldSynchronize: ${shouldSynchronize}, shouldMigrate: ${shouldMigrate}`);

        return {
          // dbms 유형
          type: 'mysql',
          // repository pattern 사용 시 사용할 entities
          // that glob paths are not supported by webpack
          entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
          // 테이블명, 필드명을 어떤 형식으로 생성할지 알려줍니다.
          namingStrategy: new SnakeNamingStrategy(),
          /*
          Note, however, that glob paths are not supported by webpack, so if you are building your application within a monorepo, you won't be able to use them.
          To address this issue, an alternative solution is provided.
          To automatically load entities, set the autoLoadEntities property of the configuration object (passed into the forRoot() method) to true
          */
          // autoLoadEntities: true,
          synchronize: shouldSynchronize,
          //
          debug: false,
          // logging level
          logging: shouldDebug ? ['query', 'log', 'info', 'error'] : ['info'],
          // logger: 'advanced-console',
          // database 설정을 참조하세요.
          // TODO timezone (Asia/Seoul) 을 아래처럼 offset (+09:00) 으로 변경할 수 있는지 확인해보자.
          timezone: '+09:00',
          // If true, connection will not be closed on application shutdown (default: false)
          // keepConnectionAlive: false,
          // 쓰기 node 와 읽기 node 분리 시 사용합니다.
          // replication: {
          //   master: {
          //     host: databaseHostForMaster,
          //     port: databasePortForMaster,
          //     username: databaseUserForMaster,
          //     password: databaseUserPasswordForMaster,
          //     database: databaseName,
          //   },
          //   slaves: [
          //     {
          //       host: databaseHostForSlave,
          //       port: databasePortForSlave,
          //       username: databaseUserForSlave,
          //       password: databaseUserPasswordForSlave,
          //       database: databaseName,
          //     },
          //   ],
          //   // If true, PoolCluster will attempt to reconnect when connection fails. (Default: true)
          //   canRetry: true,
          // },
          host: databaseHostForMaster,
          port: databasePortForMaster,
          username: databaseUserForMaster,
          password: databaseUserPasswordForMaster,
          database: databaseName,
          migrationsRun: shouldMigrate,
          migrationsTableName: 'migration',
          migrations: [__dirname + '/migrations/*.js'],
          cli: {
            migrationsDir: 'migrations',
          },
          // https://github.com/mysqljs/mysql#connection-options
          extra: {
            // The maximum number of connections to create at once. (Default: 10)
            // TODO 이게 적용되는지 확인해봐야합니다.
            connectionLimit: 10,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  /**
   * Module 이 초기화되면 database connection 연결을 확인합니다.
   */
  async onModuleInit(): Promise<void> {
    this.logger.debug(`onModuleInit`);

    const connection = getConnection();
    connection.driver.options.type;

    const runner = this.connection.createQueryRunner('slave');

    try {
      const rows = await runner.query('select 1 as pong');
      if (Array.isArray(rows) && rows.length > 0 && rows[0].pong == '1') {
        return;
      }
    } catch (e) {
      throw e;
    } finally {
      await runner.release();
    }
    throw new Error('SomethingWrongWithDatabaseConfiguration');
  }
}
