import * as dayjs from 'dayjs';
import { UnitTypeShort } from 'dayjs';
import * as dayjsTimezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(dayjsTimezone);
dayjs.extend(utc);

/**
 *
 */
export enum TimeFormat {
  YMD = 'YYYY-MM-DD',
  YMDHMS = 'YYYY-MM-DD HH:mm:ss',
}

/**
 * dayjs 설정 options
 */
export interface TimeOptions {
  // timezone 설정
  timeZone: string;
}

/**
 * Time 의 설정
 * @param options
 */
export const configTime = ({ timeZone }: TimeOptions): void => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timeZone });
  } catch (e) {
    console.error(e);
    throw new Error('InvalidTimeZone');
  }

  dayjs.tz.setDefault(timeZone);
};

/**
 *
 */
export default class Time {
  private readonly time: dayjs.Dayjs;

  /**
   * 현재시각을 반환합니다.
   */
  public static now(): Time {
    return new Time(dayjs().tz());
  }

  /**
   *
   * @param value
   */
  public static format(value: string): string {
    return dayjs.tz(value).format();
  }
  
  /**
   * Time 객체를 생성합니다.
   * 기본값은 현재 시각입니다.
   * @param time ISO8601 | timestamp | Date | dayjs instance
   * @throws InvalidTime
   */
  constructor(time?: dayjs.ConfigType) {
    if (!time) {
      this.time = dayjs().tz();
      return;
    }

    if (dayjs.isDayjs(time)) {
      this.time = time;
      return;
    }

    const d = dayjs.tz(time);
    if (d.isValid()) {
      this.time = d.tz();
      return;
    }

    throw new Error('InvalidTime');
  }

  /**
   *
   * @param t
   * @param unit
   * @private
   */
  private diff(t: dayjs.Dayjs, unit: UnitTypeShort): number {
    return this.dayjs().diff(t, unit);
  }

  /**
   *
   */
  public dayjs(): dayjs.Dayjs {
    return this.time;
  }

  /**
   *
   */
  public addSeconds(value: number): Time {
    return new Time(this.dayjs().add(value, 's'));
  }

  /**
   *
   */
  public year(): number {
    return this.time.year();
  }

  /**
   *
   */
  public month(): number {
    return this.time.month() + 1;
  }

  /**
   *
   */
  public ymd(): string {
    return this.time.format(TimeFormat.YMD);
  }

  /**
   *
   */
  public ymdhms(): string {
    return this.time.format(TimeFormat.YMDHMS);
  }

  /**
   *
   * @param t
   */
  public diffDays(t: Time): number {
    return this.diff(t.dayjs(), 'd');
  }

  /**
   *
   */
  public timestamp(): number {
    return this.time.valueOf();
  }

  /**
   *
   */
  public isValid(): boolean {
    return this.time.isValid();
  }

  /**
   * ISO8601
   */
  public toString(format?: TimeFormat): string {
    return this.time.format(format);
  }
}
