
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Time from "@common/time";
import {DateColumnTransformer} from "@common/utilities/typeorm";
import {SiteDataSourceEntity2} from "@src/modules/entity-test/entities/site-datasource-scraper2.entity";

// CREATE TABLE `plant_master` (
//   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
//   `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '발전소명',
//   `nick_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '발전소별칭',
//   `location_group_code` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '발전소위치_그룹코드',
//   `pnu_code` varchar(19) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '법정동_코드',
//   `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '주소명_1',
//   `address_detail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '주소명_2',
//   `latitude` decimal(10,7) NOT NULL COMMENT '위도',
//   `longitude` decimal(10,7) NOT NULL COMMENT '경도',
//   `is_used` tinyint(1) DEFAULT '1' COMMENT '사용여부',
//   `is_deleted` tinyint(1) DEFAULT '0' COMMENT '삭제여부',
//   `updated_by` int(11) NOT NULL DEFAULT '0' COMMENT '변경자ID',
//   `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '변경일시',
//   `created_by` int(11) NOT NULL DEFAULT '0' COMMENT '등록자ID',
//   `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일시',
//   PRIMARY KEY (`id`) USING BTREE
// ) ENGINE=InnoDB AUTO_INCREMENT=10009685 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='발전소_마스터_V3'
@Entity('plant_master')
export class SiteEntity {
  @PrimaryGeneratedColumn({
    comment: '발전소 ID',
    name: 'id',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    comment: '발전소명',
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    comment: '발전소 별칭',
    type: 'varchar',
    length: 100,
  })
  nickName: string;

  @Column({
    comment: '발전소위치 그룹코드',
    type: 'varchar',
    length: 2,
    nullable: true,
  })
  locationGroupCode: string;

  @Column({
    comment: '법정동 코드',
    name: 'pnu_code',
    type: 'varchar',
    length: 19,
    nullable: true,
  })
  bCode: string;

  @Column({
    comment: '주소',
    name: 'address',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  address1: string;

  @Column({
    comment: '상세주소',
    name: 'address_detail',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  address2: string;

  @Column({
    comment: '위도',
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  latitude: number;

  @Column({
    comment: '경도',
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  longitude: number;

  @Column({
    comment: '사용여부',
    type: 'bool',
    nullable: true,
  })
  isUsed: boolean;

  @Column({
    comment: '삭제여부',
    type: 'bool',
    nullable: true,
  })
  isDeleted: boolean;

  @Column({
    comment: '변경자 ID',
    type: 'int',
    nullable: true,
  })
  updatedBy: number;

  @Column({
    comment: '변경일시',
    type: 'datetime',
    nullable: true,
    transformer: DateColumnTransformer,
  })
  updatedAt: Time;

  @Column({
    comment: '생성자 ID',
    type: 'int',
    nullable: true,
  })
  createdBy: number;

  @Column({
    comment: '생성일시',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: DateColumnTransformer,
    nullable: true,
  })
  createdAt: Time;
  
  @OneToMany(() => SiteDataSourceEntity2, ds => ds.site)
  dataSource: SiteDataSourceEntity2;
}
