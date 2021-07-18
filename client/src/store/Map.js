/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import { positions } from "@/../samples";
import axios from 'axios';
import { BASE_URL, axiosOptions, TOKEN, EMAIL } from "@/store/Global";

export default class Map {
  initMap() {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=clusterer,services,drawing`;
    document.head.appendChild(script);
  }

  async getAllGus() {
    const token = JSON.parse(sessionStorage.getItem(TOKEN));
    if(!token) return;
    
    const headers = {
      Authorization: `TOKEN ${token}`
    }

    const response = await axios.get(`${BASE_URL}/map/gus`, { headers }, axiosOptions);
    console.log(response);
  }

  async addClusterer() {
    await this.getAllGus();
    kakao.maps.load(function () {
      let map = new kakao.maps.Map(document.getElementById("map"), {
        center: new kakao.maps.LatLng(37.4600969, 126.9001546), // 지도의 중심좌표
        level: 8, // 지도의 확대 레벨
      });
      let clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 5, // level 5까지 클러스터러가 보인다
      });

      let arrs = positions.positions;
      // let markers = arrs.map((position, index) => {
      //   return new kakao.maps.Marker({
      //     position: new kakao.maps.LatLng(position.lat, position.lng),
      //   });
      // });

      // Custom overlays
      let customOverlays = arrs.map((position, index) => {
        return new kakao.maps.CustomOverlay({
          content: '<div style="padding:5px 5px; background:#FEF7DC;">Hello</div>',
          position: new kakao.maps.LatLng(position.lat, position.lng),
          map: map,
        });
      });

      clusterer.addMarkers(customOverlays);
    });
    const content = `
    <div style="padding:0 5px;background:#fff;>hello</div>
    `
  }
}