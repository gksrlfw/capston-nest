import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartEntity } from './entities/apart.entity';

@Injectable()
export class ApartsService {

  constructor(@InjectRepository(ApartEntity) private apartRepository: Repository<ApartEntity>) {}

  getAllAparts() {
    return this.apartRepository.query(`select * from apart limit 10`);
  }

  getAllGus() {
    return this.apartRepository.query(`select * from gu`);
  }
}
