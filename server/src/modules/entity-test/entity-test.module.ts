import { Module } from '@nestjs/common';
import { EntityTestService } from './entity-test.service';
import { EntityTestController } from './entity-test.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SiteEntity} from "@src/modules/entity-test/entities/site.entity";
import {SiteDataSourceEntity} from "@src/modules/entity-test/entities/site-datasource-scraper.entity";
import {SiteDataSourceEntity2} from "@src/modules/entity-test/entities/site-datasource-scraper2.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SiteEntity, SiteDataSourceEntity, SiteDataSourceEntity2])],
  providers: [EntityTestService],
  controllers: [EntityTestController]
})
export class EntityTestModule {}
