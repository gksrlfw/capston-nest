/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
// import { positions } from "@/../samples";
import axios from 'axios';
import { BASE_URL, axiosOptions, TOKEN, EMAIL } from "@/store/Global";
import { reactive, toRefs, ref, watch } from "vue";

export default class Map {
  map;
  initMap() {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=clusterer,services,drawing`;
    document.head.appendChild(script);
  }

  async addClusterer() {
    let isOver = true;
    let data = ref();
    data.value = await getAllGus();

    /**
     * load가 된 이후에 모든 작업을 시작합니다.
     */
    kakao.maps.load(() => {
      // 맵 생성
      let map = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985), // 지도의 중심좌표
        level: 8, // 지도의 확대 레벨
      });

      // 클러스터러 생성
      let clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 5, // level 5까지 클러스터러가 보인다
      });

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      let zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'zoom_changed', async function() {        
        // 지도의 현재 레벨을 얻어옵니다
        let level = map.getLevel();
        let message = '현재 지도 레벨은 ' + level + ' 입니다';
        console.log(message);

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
          console.log(latlng)
          data.value = await getAllApart({ lat: latlng.La, lng: latlng.Ma });
          isOver = false;
        }
      });

      // Custom overlays로 지도에 표시
      let customOverlays = data.value.map((position, index) => {
        return new kakao.maps.CustomOverlay({
          // content: `<div style="padding:5px 5px; background:#FEF7DC;">${position.size}</div>`,
          content: getContent(position.size),
          position: new kakao.maps.LatLng(position.latitude, position.longitude),
          map: map,
        });
      });

      clusterer.addMarkers(customOverlays);

      // data가 바뀌면 마커를 다시 그려줍니다.
      watch(() => data.value, () => {
        let customOverlays = data.value.map((position, index) => {
          return new kakao.maps.CustomOverlay({
            // content: `<div style="padding:5px 5px; background:#FEF7DC;">${position.size}</div>`,
            content: getContent(position.size),
            position: new kakao.maps.LatLng(position.latitude, position.longitude),
            map: map,
          });
        });
  
        clusterer.addMarkers(customOverlays);
      });
    });
  }
}

function a() {
  // Custom overlays로 지도에 표시
  let customOverlays = data.value.map((position, index) => {
    return new kakao.maps.CustomOverlay({
      // content: `<div style="padding:5px 5px; background:#FEF7DC;">${position.size}</div>`,
      content: getContent(position.size),
      position: new kakao.maps.LatLng(position.latitude, position.longitude),
      map: map,
    });
  });

  clusterer.addMarkers(customOverlays);
}

/**
 * 최초에는 각 구에 몇개가 있는지 갯수를 세어서 리턴해준다
 * @returns 
 */
async function getAllGus() {
  console.log('get All gu');
  const token = JSON.parse(sessionStorage.getItem(TOKEN));
  if(!token) return;
  
  const headers = {
    Authorization: `TOKEN ${token}`
  };

  const response = await axios.get(`${BASE_URL}/map/gus`, { headers }, axiosOptions);
  return response.data;
}

/**
 * 모든 아파트를 가져옵니다. 원래는 현재 위치에서 일정 범위 이내의 값을 계속해서 로드할 생각이었지만 귀찮아졌습니다.
 */
async function getAllApart({ lat, lng }) {
  console.log('get All apart');
  const token = JSON.parse(sessionStorage.getItem(TOKEN));
  if(!token) return;
  
  const headers = {
    Authorization: `TOKEN ${token}`
  };

  const body = {
    latitude: lat,
    longitude: lng
  };

  const response = await axios.get(`${BASE_URL}/map/aparts`, { headers, body }, axiosOptions);
  return response.data;
}

function controllZoom(map) {
  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, 'zoom_changed', function() {        
      
      // 지도의 현재 레벨을 얻어옵니다
      var level = map.getLevel();
      
      var message = '현재 지도 레벨은 ' + level + ' 입니다';
      console.log(message);
      // var resultDiv = document.getElementById('result');  
      // resultDiv.innerHTML = message;
      
  });
}

/**
 * 그릴 마커 형식입니다.
 * @param {*} str 
 * @returns 
 */
const getContent = (str) => {
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
}