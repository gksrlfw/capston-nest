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

  /**
   * 유저가 입력한 값에 해당하는 이름을 가진 아파트들만 추려서 보내준다.
   * 삼성을 검색했을 때, 삼성래미안은 리버힐삼성보다 앞에 보여야한다.
   * 해당 글자가 있는 인덱스를 저장하여 이를 기준으로 정렬한다.
   * @param helper
   */
  async setSearchHelper(helper) {
    return (await this.getAllAparts())
        .map(apart => {
          if(apart.apart.includes(helper)) return [apart.apart.indexOf(helper), apart.apart];
        })
        .filter(n => n !== undefined)
        .sort()
        .map(n => n[1]);
  }
}
