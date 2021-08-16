import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartsController } from './aparts.controller';
import { ApartsService } from './aparts.service';
import { ApartEntity } from './entities/apart.entity';
import {UserEntity} from "@src/modules/users/entities/users.entity";
import {ClickLogEntity} from "@src/modules/users/entities/click-log.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ApartEntity, UserEntity, ClickLogEntity])],
  providers: [ApartsService],
  controllers: [ApartsController]
})
export class ApartsModule {}
