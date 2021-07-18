import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartsController } from './aparts.controller';
import { ApartsService } from './aparts.service';
import { ApartEntity } from './entities/apart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartEntity])],
  providers: [ApartsService],
  controllers: [ApartsController]
})
export class ApartsModule {}
