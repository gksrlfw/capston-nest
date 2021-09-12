import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ApartEntity} from "@src/modules/aparts/entities/apart.entity";
import {Repository} from "typeorm";
import {UserEntity} from "@src/modules/users/entities/users.entity";
import {ClickLogEntity} from "@src/modules/users/entities/click-log.entity";
import {SiteEntity} from "@src/modules/entity-test/entities/site.entity";
import {SiteDataSourceEntity} from "@src/modules/entity-test/entities/site-datasource-scraper.entity";
import Time from "@common/time";
import {SiteDataSourceEntity2} from "@src/modules/entity-test/entities/site-datasource-scraper2.entity";

@Injectable()
export class EntityTestService {
  constructor(
    @InjectRepository(SiteEntity) private siteEntityRepository: Repository<SiteEntity>,
    @InjectRepository(SiteDataSourceEntity) private siteDataSourceEntityRepository: Repository<SiteDataSourceEntity>,
    @InjectRepository(SiteDataSourceEntity2) private siteDataSourceEntityRepository2: Repository<SiteDataSourceEntity2>,
  ) {}
  testing() {
    const dataSource = this.siteDataSourceEntityRepository.create({
      siteId: 1,
      dataSourceId: 1,
      createdAt: Time.now(),
    });
    console.log(dataSource);
    
    return this.siteDataSourceEntityRepository.save(dataSource);
  }
  
  async testing2() {
    await this.siteEntityRepository.save({
      id: 3,
      name: 'a',
      nickName: 'a',
      isUsed: true,
      isDeleted: false,
    })
    const dataSource = this.siteDataSourceEntityRepository2.create({
      // @relation 으로는 plant_id 가 저장되지 않는다.
      // 신기하게 그냥 siteId를 컬럼으로 놔두면 저장된다.
      // siteId: 1,
      dataSourceId: 1,
      createdAt: Time.now(),
      monitoringInfo: {
        url: 'a',
        plant_name_on_monitoring: 'a'
      },
      // 반드시 이렇게 줘야한다. create로 하니까 nullable 때문에 안된다
      site: {
        id: 2,
      }
      // 안됨..
      // site: this.siteEntityRepository.create({
      //   id: 1,
      // })
    });
    console.log(dataSource);
    
    return this.siteDataSourceEntityRepository2.save(dataSource);
  }
  
  async testing3() {
    let a = await this.siteDataSourceEntityRepository
      .createQueryBuilder('ds')
      // .where('ds.id = :id', { id: 1 })
      // .getOne();
    
    a = await a.where('ds.id = :id', { id: 1 });
    console.log(await a.getOne());
  
    return a.getOne();
  }
  
  async testingJoin() {
    let a = await this.siteDataSourceEntityRepository2
      .createQueryBuilder('ds')
      .leftJoinAndSelect('ds.site', 'site')
      // .leftJoin('ds.site', 'site')
      .getOne();
    console.log(a);
    return a;
  }
  
  async testingBuilder() {
    const res = await this.siteEntityRepository.createQueryBuilder('site')
    	.leftJoinAndSelect('site.dataSource', 'dataSource')
    	.where('site.id = :siteId', { siteId: 2 })
      .andWhere('JSON_EXTRACT(dataSource.monitoringInfo, "$.url") = :url', { url: 'a' })
      .andWhere('JSON_EXTRACT(dataSource.monitoringInfo, "$.plant_name_on_monitoring") = :plantNameOnMonitoring', { plantNameOnMonitoring: 'a' })
    	.andWhere('site.isUsed is true')
    	.andWhere('site.isDeleted is false')
      .getMany();

  // .where('profile @> :profile', {
  //     profile: {
  //       id: profile.id,
  //       provider: profile.provider,
  //     },
  //   }).getOne();
    
    console.log(res);
    return res;
  }
}


