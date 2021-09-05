import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartEntity } from './entities/apart.entity';
import {UserEntity} from "@src/modules/users/entities/users.entity";
import axios from "axios";
import {ClickLogEntity} from "@src/modules/users/entities/click-log.entity";
import Time from "@common/time";

let isRec = false;
@Injectable()
export class ApartsService {
  isRecommend = false;
  constructor(
    @InjectRepository(ApartEntity) private apartRepository: Repository<ApartEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ClickLogEntity) private clickLogRepository: Repository<ClickLogEntity>,
  ) {}
  
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
  
  /**
   * dong, apart, user 정보를 전송합니다.
   */
  async sendInfoForRecommendation({ dong, apart, user }) {
    try {
      console.log('sendInfoForRecommendation...', user)
      const userInfo = await this.userRepository.findOne({ id: user.id });
      const apartInfo = (await this.apartRepository.query(`select * from apart where dong = ? and apart = ? limit 1`, [dong, apart]))[0];
    
      let recommend;
    
      console.log('isRec', isRec);
      // flask 서버로 보낸다
      // if(!isRec) {
      isRec = true;
      recommend = await axios.get(`https://33bd-1-231-217-180.ngrok.io/recommend/${userInfo.id}`);
    
      isRec = false;
      console.log(recommend.data, userInfo.id, isRec);
      // }
    
      const clickLog = this.clickLogRepository.create({
        userId: userInfo.id,
        apartId: apartInfo.id,
        created: Time.now(),
        updated: Time.now(),
      });
      await this.clickLogRepository.save(clickLog);
      console.log('insert log: ', userInfo.id, apartInfo.id);
    
      return recommend?.data;
    }
    catch(err) {
      console.error(err.message);
    }
  }
  
  /**
   * 여기서 바로 계산해서 줍니다. 이것도 안되면 프론트에서 바로 요청해봅시다..
   * @param dong
   * @param apart
   * @param user
   */
  async sendInfoForRecommendation2({ dong, apart, user }) {
    try {
      console.log('sendInfoForRecommendation...', user)
      const userInfo = await this.userRepository.findOne({ id: user.id });
      const apartInfo = (await this.apartRepository.query(`select * from apart where dong = ? and apart = ? limit 1`, [dong, apart]))[0];
      
      let recommend;
      
      console.log('isRec', isRec);
      // flask 서버로 보낸다
      // if(!isRec) {
      isRec = true;
      recommend = await axios.get(`https://7039-1-231-217-180.ngrok.io/recommend/${userInfo.id}`);
      
      isRec = false;
      console.log(recommend.data, userInfo.id, isRec);
      // }
      
      const clickLog = this.clickLogRepository.create({
        userId: userInfo.id,
        apartId: apartInfo.id,
        created: Time.now(),
        updated: Time.now(),
      });
      await this.clickLogRepository.save(clickLog);
      console.log('insert log: ', userInfo.id, apartInfo.id);
      
      // return recommend?.data;
  
      return this.searchApartsWithIds(recommend?.data?.prediction);
    }
    catch(err) {
      console.error(err.message);
    }
  }

  async searchApartsWithIds(ids: number[]) {
    console.log('ids', ids);
    if(ids.length>5) {
      const temp = [];
      for(let i=0 ;i<5; i++)
        temp.push(ids[i]);
      ids = temp;
    }
    return this.apartRepository.findByIds(ids);
  }
}
