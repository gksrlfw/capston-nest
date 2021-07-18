import { classToPlain, Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';


@Entity('gu')
export class GuEntity extends AbstractEntity {
  
  @Column()
  name: string;

  @Column()
  size: number; // 아파트 갯수

  toJSON() {
    return classToPlain(this);
  }
}
