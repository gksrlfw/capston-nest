import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartEntity } from './entities/apart.entity';

@Injectable()
export class ApartsService {

  constructor(@InjectRepository(ApartEntity) private apartRepository: Repository<ApartEntity>) {}
  
  /**
   * 아파트 위치를 기준으로 서로다른 아파트만 리턴합니다.
   */
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
  
  /**
   * 모든 구를 리턴합니다.
   */
  async getAllGus() {
  
    // 각 구에 거래되어진 아파트의 개수를 저장합니다. 최초 1회만 시행합니다.
    // let gus = await this.apartRepository.query(`select * from gu`);
    //
    // for(let gu of gus) {
    //   const aparts = await this.getAllAparts();
    //   let newAparts = [];
    //   for(let apart of aparts) {
    //     if(apart.gu === gu.name) {
    //       newAparts.push(apart);
    //     }
    //   }
    //   await this.apartRepository.query(`update gu set size=? where name=?`, [newAparts.length, gu.name]);
    // }
    
    return this.apartRepository.query(`select * from gu`);
  }

  /**
   * 유저가 입력한 값에 해당하는 이름을 가진 아파트들만 추려서 보내줍니다.
   * '삼성'을 검색했을 때, '삼성래미안'은 '리버힐삼성'보다 앞에 보여야합니다.
   * 해당 글자가 있는 인덱스를 저장하여 이를 기준으로 정렬합니다.
   *
   * 최대 25개를 리턴합니다.
   * 여러개의 아이파크가 연속으로 안나오는 이유: '아이'파크 보다 '아시'아선수촌이 더 순위가 높습니다...
   * 모든 글자에 대해서 비교할 순 없으므로 방법이 필요합니다.
   * @param helper
   */
  async setSearchHelper(helper) {
    return (await this.getAllAparts())
        .map(apart => {
          if(apart.apart.includes(helper)) return [apart.apart.indexOf(helper), apart];
        })
        .filter(n => n !== undefined)
        .sort()
        .map(n => n[1])
        .sort((a, b) => { return a.apart - b.apart })
        .filter((_, i) => i < 25);
  }
  
  async searchOneApart({ dong, apart }) {
    const aparts = await this.apartRepository.query(`select * from apart where dong = ? and apart = ?`, [dong, apart]);
    
    const map = new Map<number, Array<any>>();
    let temp;
    aparts.map(apart => {
      if(map.has(apart.area)) {
        temp = map.get(apart.area);
        temp.push(apart);
        map.set(apart.area, temp);
      }
      else {
        temp = [];
        temp.push(apart)
        map.set(apart.area, temp);
      }
    });
    
    // Map to array
    return Array
      .from(map, ([area, value]) => ({ area, value }));
  }
  
  async searchOneGuWithPosition({ lat, lng }) {
    const guInfo = await this.apartRepository.query(`select * from gu where latitude=? and longitude=?`, [lat, lng]);
    const aparts = await this.getAllAparts();
    return aparts.filter(apart => apart.gu === guInfo[0].name);
  }
}
