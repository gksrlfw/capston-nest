import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartEntity } from './entities/apart.entity';

@Injectable()
export class ApartsService {

  constructor(@InjectRepository(ApartEntity) private apartRepository: Repository<ApartEntity>) {}

  async getAllAparts() {
    const aparts = await this.apartRepository.query(`select * from apart order by traded_at desc`);

    const map = new Map<number, Array<any>>();

    return aparts.map(apart => {
      if(map.has(apart.latitude)) {
        if(map.get(apart.latitude) === apart.longitude) return;
      }
      else {
        map.set(apart.latitude, apart.longitude);
        return apart;
      }
    })
    .filter(n => n !== undefined);
  }

  getAllGus() {
    return this.apartRepository.query(`select * from gu`);
  }
}
