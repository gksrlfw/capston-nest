import { Transform } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Time from '../time';
import { DateColumnTransformer } from '../utilities/typeorm';

@Entity()
export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  // Client 에 반환할 때 ISO 8601 string 으로 반환합니다.
  @Transform(({ value }) => value.toString())
  @CreateDateColumn({
    transformer: DateColumnTransformer,
  })
  created: Time;

  @Transform(({ value }) => value.toString())
  @UpdateDateColumn({
    transformer: DateColumnTransformer,
  })
  updated: Time;
}
