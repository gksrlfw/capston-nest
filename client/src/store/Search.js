/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import { reactive, toRefs, ref } from "vue";
import { BASE_URL, TOKEN, EMAIL, recommendLists } from "@/store/Global";
import axios from 'axios';

export class SearchStore {
  userInputApart = ref('');
  userInputGu = ref('');
  searchHelper = ref('');
  currentAparts = ref('');
  // currentAparts = ref([{    // 현재 선택된 아파트의 모든 거래 내역을 area, value로 받아옵니다.
  //   area: "78.94",
  //   value: [
  //       {
  //           id: 4285,
  //           created: "2021-07-18T12:04:32.107Z",
  //           updated: "2021-07-18T12:04:32.107Z",
  //           price: 61800,
  //           built_at: 2007,
  //           traded_at: "2020-07-01T15:00:00.000Z",
  //           dong: "면목동",
  //           apart: "마젤란21",
  //           latitude: "37.58686760",
  //           longitude: "127.08412530",
  //           floor: 8,
  //           area: "78.94"
  //       }
  //   ]
  // }]);
  currentApart = ref('');   // 현재 선택된 아파트 정보

  getSearchHelper() {
    return this.searchHelper;
  }

  getCurrentAparts() {
    return this.currentAparts;
  }

  getCurrentApart() {
    return this.currentApart;
  }

  /**
   * 유저의 입력값에 따라 서치헬퍼를 등록합니다.
   */
  async setSearchHelper(userInput) {
    try {
      if(!userInput) return;
      const token = JSON.parse(sessionStorage.getItem(TOKEN));
      if(!token) return alert('로그인이 필요합니다.');
  
      const headers = {
        Authorization: `TOKEN ${token}`
      };
  
      const response = await axios.get(`${BASE_URL}/search/helper?helper=${userInput}`, { headers });
      this.searchHelper.value = response.data;
    }
    catch(err) {
      console.error(err);
      this.searchHelper.value = '';
    }
  }

  /**
   * 입력에 해당하는 구에 대한 아파트만 가져옵니다.
   */
  async filterGu(userInput) {
    this.userInputGu.value = userInput;
    const response = await axios.get(`${BASE_URL}/search/gu?gu=${userInput}`);
  }

  /**
   * 아파트 이름에 해당하는 모든 아파트를 가져옵니다.
   */
  async searchAllApart(userInput) {
    this.userInputApart.value = userInput;
    const response = await axios.get(`${BASE_URL}/search/aparts?apart=${userInput}`);
  }

  /**
   * apart, 동으로 해당 아파트의 정보를 검색합니다.
   */
  async searchOneApart({ dong, apart }) {
    try {
      if(!dong || !apart) return alert('동, 아파트 이름이 필요합니다.');
      const token = JSON.parse(sessionStorage.getItem(TOKEN));
      if(!token) return alert('로그인이 필요합니다.');
  
      const headers = {
        Authorization: `TOKEN ${token}`
      };
      const response = await axios.get(`${BASE_URL}/search/apart?apart=${apart}&dong=${dong}`, { headers });
      this.currentAparts.value = response.data;
      this.currentApart.value = response.data[0]?.value[0];
    }
    catch(err) {
      console.error(err);
    }
  }
  
  /**
   * 먼저 검색 결과를 받아옵니다.
   * 그다음 해당 내용으로 추천 목록을 받아옵니다. 비동기로 처리되는지 확인해야 합니다.
   */
  async searchOneApart2({ dong, apart }) {
    try {
      if(!dong || !apart) return alert('동, 아파트 이름이 필요합니다.');
      const token = JSON.parse(sessionStorage.getItem(TOKEN));
      if(!token) return alert('로그인이 필요합니다.');
      
      const headers = {
        Authorization: `TOKEN ${token}`
      };
      const response = await axios.get(`${BASE_URL}/search/apart?apart=${apart}&dong=${dong}`, { headers });
      console.log(response.data);
      this.currentAparts.value = response.data;
      this.currentApart.value = response.data[0].value[0];
      
      const res = await axios.get(`${BASE_URL}/search/apart/recommend?apart=${apart}&dong=${dong}`, { headers });
      recommendLists.value = res.data;
      console.log('rec', recommendLists.value);
      
    }
    catch(err) {
      console.error(err);
    }
  }
  
  async searchOneGuWithPosition({ lat, lng }){
    try {
      const token = JSON.parse(sessionStorage.getItem(TOKEN));
      if(!token) return alert('로그인이 필요합니다.');
  
      const headers = {
        Authorization: `TOKEN ${token}`
      };
      const response = await axios.get(`${BASE_URL}/search/gu?lat=${lat}&lng=${lng}`, { headers });
      this.currentAparts.value = response.data;
    }
    catch(err) {
      console.error(err);
    }
  }

  async getApartsWithIds(ids) {
    try {
      console.log(ids);
      const response = await axios.post(`${BASE_URL}/search/aparts/ids`, { 
        ids
      });
      console.log(response.data);
      return response.data;
    }
    catch(err) {
      console.error(err);
    }
  }
}

const searchStore = new SearchStore();
export default searchStore;
