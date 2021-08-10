/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
// import { positions } from "@/../samples";
import axios from 'axios';
import { BASE_URL, TOKEN, EMAIL } from "@/store/Global";
import { reactive, toRefs, ref, watch } from "vue";

let map;
export default class KakaoMap {
  initMap(addClusterer) {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=clusterer,services,drawing`;
    document.head.appendChild(script);
    /**
     * script가 먼저 로드된 후에 callback을 호출합니다.
     */
    script.addEventListener('load', addClusterer);
  }

  /**
   * 현재 아파트를 지도 중심으로 설정합니다.
   */
  setLocation({ lat, lng }) {
    // 이동할 위도 경도 위치를 생성합니다 
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    // 지도 중심을 이동시킵니다
    map.setCenter(moveLatLon);
    // zoom level을 설정합니다.
    map.setLevel(3);    
  }
  
  /**
   * 클러스터러 관련 설정입니다.
   * @param lat
   * @param lng
   * @returns {Promise<void>}
   */
  async addClusterer({ lat, lng }) {
    let isOver = true;
    let data = ref();
    data.value = await getAllGus();
    if(!data.value || !data.value.length) return;

    /**
     * load가 된 이후에 모든 작업을 시작합니다.
     */
    kakao.maps.load(() => {
      // 맵 생성
      map = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 7, // 지도의 확대 레벨
        maxLevel: 8
      });

      // 클러스터러 생성
      let clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 4, // level 5까지 클러스터러가 보인다.
      });

      // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다.
      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      // fixme: 8이상이 되었을 때, 구의 개수를 중심으로 클러스터러가 형성됩니다. 
      kakao.maps.event.addListener(map, 'zoom_changed', async function() {        
        // 지도의 현재 레벨을 얻어옵니다
        let level = map.getLevel();
        if(level > 6) {
          if(isOver) return;
          data.value = await getAllGus();
          isOver = true;
        }
        else {
          // 현재 위치에서의 중심 좌표
          // 지금 6을 기준으로 나뉜다
          // 각 zoom 마다 좌표 범위를 설정하지 말고, 6을 기준으로 화면 전체에 해당하는 4개의 좌표 위치를 구한다
          // 이 범위 내에 있는 아파트들을 불러오자
          let latlng = map.getCenter();   
          data.value = await getAllApart({ lat: latlng.La, lng: latlng.Ma });
          isOver = false;
        }
      });

      // Custom overlays로 지도에 표시
      let customOverlays = data.value.map((position, index) => {
        return new kakao.maps.CustomOverlay({
          // content: clusterCss(position.size, position.latitude, position.longitude),
          content: position.size ? clusterCss(position.size): getContentName(position.apart, position.dong),
          position: new kakao.maps.LatLng(position.latitude, position.longitude),
          map: map,
        });
      });  

      clusterer.addMarkers(customOverlays);
      
      // data가 바뀌면 마커를 다시 그려줍니다.
      watch(() => data.value, () => {
        clusterer.clear();
        let customOverlays = data.value.map((position, index) => {
          return new kakao.maps.CustomOverlay({
            content: position.size ? clusterCss(position.size): getContentName(position.apart, position.dong),
            position: new kakao.maps.LatLng(position.latitude, position.longitude),
            map: map,
          });
        });

        clusterer.addMarkers(customOverlays);
      });
    });
  }
}




/**
 * 최초에는 각 구에 몇개가 있는지 갯수를 세어서 리턴해준다
 * @returns 
 */
async function getAllGus() {
  const token = JSON.parse(sessionStorage.getItem(TOKEN));
  if(!token) return alert('로그인이 필요합니다.');
  
  const headers = {
    Authorization: `TOKEN ${token}`
  };

  const response = await axios.get(`${BASE_URL}/map/gus`, { headers });
  return response.data;
}

/**
 * 모든 아파트를 가져옵니다. 원래는 현재 위치에서 일정 범위 이내의 값을 계속해서 로드할 생각이었지만 귀찮아졌습니다.
 */
async function getAllApart({ lat, lng }) {
  const token = JSON.parse(sessionStorage.getItem(TOKEN));
  if(!token) return;
  
  const headers = {
    Authorization: `TOKEN ${token}`
  };

  const body = {
    latitude: lat,
    longitude: lng
  };

  const response = await axios.get(`${BASE_URL}/map/aparts`, { headers, body });
  return response.data;
}

/**
 * 원 형식
 * @param {*} str 
 * @returns 
 */
const getContentNumber = (str) => {
  return `
  <div style="
  color: #4A3933;		
  box-sizing: border-box;
  border-radius: 50% 50%;
  height: 50px;
  width: 50px;  
  text-align: center;
  line-height: 50px;
  background-color:#CDF0EA;">${str}</div>
  `;
};

/**
 * 아파트 이름, 동을 함께 저장합니다.
 * @param {*} str 
 * @returns 
 */
const getContentName = (str, dong) => {
  return `
  <div 
    data-dong=${dong} 
    style="
    box-sizing: border-box;
    border-radius: 10%;
    /* height: 50px; */
    /* width: 50px; */
    text-align: center;
    /* line-height: 50px; */
    background-color: gray;
    color: whitesmoke;
    padding: 5% 10% 5% 10%;
    /* margin-right: 1px; */
    display: inline;
  ">${str}</div>
  `;
};

/**
 * kakao 제공 css
 * @param {*} str 
 * @returns 
 */
const clusterCss = (str, lat, lng) => {
  return `
  <div 
  data-lat=${lat}
  data-lng=${lng} 
  style="cursor: pointer; 
  width: 52px; 
  height: 52px; 
  line-height: 52px; 
  font-size: 14px; 
  background: url('http://i1.daumcdn.net/localimg/localimages/07/mapjsapi/cluster.png') 0px 0px; 
  text-align: center; font-weight: bold;">
  ${str}</div>
  `;
};
