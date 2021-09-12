import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {DateColumnTransformer} from "@common/utilities/typeorm";
import Time from "@common/time";

@Entity('plant_detail')
export class SiteDetailEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    comment: '발전소 ID',
    name: 'plant_id',
    type: 'int',
    unsigned: true,
    unique: true,
  })
  siteId: number;

  

  @Column({
    comment: '생성일',
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: DateColumnTransformer,
  })
  createdAt: Time;

  // fixme updatedAt 은 기본값이 있을 필요가 없습니다.
  @Column({
    comment: '수정일',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    transformer: DateColumnTransformer,
  })
  updatedAt?: Time;

  @BeforeInsert()
  protected beforeInsert(): void {
    this.createdAt = Time.now();
  }

  @BeforeUpdate()
  protected beforeUpdate(): void {
    this.updatedAt = Time.now();
  }
}
