import Time from '@common/time';
import { DeleteResult, FindOperator, UpdateResult } from 'typeorm';

/**
 *
 */
export const DateColumnTransformer = {
  // database 에 입력할 때
  to(time: Time | FindOperator<any>): string | FindOperator<any> {
    if (time instanceof FindOperator) {
      return time;
    }
    if (time) {
      return time.ymdhms();
    }
    return null;
  },
  // database 에서 조회할 때
  from(value: string | Time): Time {
    if (value) {
      if (value instanceof Time) {
        return value;
      }
      return new Time(value);
    }
    return null;
  },
};

/**
 *
 * @param result
 * @constructor
 */
export const IsNotAffected = (result: UpdateResult | DeleteResult): boolean => result.raw?.affectedRows === 0;
