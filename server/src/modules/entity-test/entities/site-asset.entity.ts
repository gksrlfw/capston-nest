
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Time from "@common/time";
import {DateColumnTransformer} from "@common/utilities/typeorm";

@Entity('plant_asset')
export class SiteAssetEntity {
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
    type: 'bool',
    default: true,
  })
  isUsed: boolean;

  @Column({
    type: 'bool',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  createdBy: number;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  updatedBy: number;

  @Column({
    comment: '생성일',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
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
