import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';


@Entity('apart')
export class ApartEntity extends AbstractEntity {
  
  @Column()
  price: number;

  @Column()
  built_at: number;     // 건축년도

  @Column()
  traded_at: Date;    // 년, 월, 일 합치기

  @Column()
  gu: string;
  
  @Column()
  dong: string;     

  @Column()
  apart: string;

  @Column("decimal", { precision: 11, scale: 8 })
  latitude: number;

  @Column("decimal", { precision: 11, scale: 8 })
  longitude: number;

  @Column()
  floor: number;

  @Column("decimal", { precision: 5, scale: 2 })
  area: number;

  toJSON() {
    return classToPlain(this);
  }
}
