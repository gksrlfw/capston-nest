

import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId} from 'typeorm';
import {DateColumnTransformer} from "@common/utilities/typeorm";
import Time from "@common/time";

@Entity('plant_monitoring')
export class SiteDataSourceEntity {
  @PrimaryGeneratedColumn({
    comment: 'Row ID',
  })
  id: number;

  @Column({
    comment: '발전소 ID',
    name: 'plant_id',
  })
  siteId: number;

  @Column({
    comment: '데이터 수집 유형 ID',
    name: 'monitoring_id',
  })
  dataSourceId: number;


  @Column({
    comment: '수정자 ID',
    type: 'int',
    nullable: true,
  })
  updatedBy: number;

  @Column({
    comment: '수정일시',
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
    transformer: DateColumnTransformer,
  })
  createdAt: Time;

  // fixme 관계로 변경해야합니다.
  // @ManyToOne(() => SiteEntity, site => site.id)
  // @JoinColumn({ name: 'plant_id' })
  // site: SiteEntity;
  //
  // @RelationId((datasource: SiteDataSourceEntity) => datasource.site)
  // siteId: number;
}
