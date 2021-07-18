import Time, { configTime } from './time';

describe('Time', () => {
  beforeAll(async () => {
    // const app: TestingModule = await Test.createTestingModule({
    //   imports: [ConfigModule.forRoot({})],
    // }).compile();
    //
    // const configService = app.get<ConfigService>(ConfigService);
    //
    // const appTimeZone = configService.get('APP_TIMEZONE');

    const timezone = 'America/New_York';
    configTime({
      timeZone: timezone,
    });
  });

  it('config tests', () => {
    {
      expect(() => {
        configTime({
          timeZone: 'Foo/Bar',
        });
      }).toThrow('InvalidTimeZone');
    }

    {
      expect(
        configTime({
          timeZone: 'Asia/Seoul',
        }),
      ).toBeUndefined();
    }
  });

  it('instance tests', () => {
    {
      const t = new Time('2020-01-01 00:00:00');
      console.log(t.toString());
    }

    {
      const t = new Time('2020-01-01T00:00:00+09:00');
      console.log(t.toString());
    }

    {
      const t = new Time('2020-01-01T00:00:00Z');
      console.log(t.toString());
    }
  });
});
