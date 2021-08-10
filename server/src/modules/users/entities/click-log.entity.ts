import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { AbstractEntity } from '@common/entities/abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

/**
 * 클릭 로그를 기록합니다.
 */
@Entity('click_log')
export class ApartEntity extends AbstractEntity {
  
  
  
  toJSON() {
    return classToPlain(this);
  }
}
