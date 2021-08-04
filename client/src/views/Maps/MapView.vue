<template>
  <div id="nav" class="">
    <div id="map" class="" @click="searchOneApart" ></div>
  </div>
  <aparts-view class="w-4/7 ml-14" />
</template>
<script>
import { onMounted, watch } from "vue";
import KakaoMap from "@/store/KakaoMap";
import ApartsView from "@/views/List/ApartsView.vue";
import searchStore from "@/store/Search";

export default {
  components: {
    ApartsView
  },
  setup() {
    let map = new KakaoMap();
    const currentApart = searchStore.getCurrentApart();

    watch(() => currentApart.value, () => {
      map.setLocation({ lat: currentApart.value.latitude, lng: currentApart.value.longitude });
    });

    onMounted(() => {
      map.initMap(() => map.addClusterer({ lat: 37.5642135, lng: 127.0016985 }));
    });

    function searchOneApart(e) {
      const target = e.target;
      
      // 아파트를 클릭했을 때
      if(target.dataset?.dong) {
        searchStore.searchOneApart({ dong: target.dataset.dong, apart: target.textContent });
      }

      // 구에 대한 클러스터러를 클릭했을 때
      if(target.dataset?.lat && target.dataset?.lng) {
        // searchStore.searchOneGuWithPosition({ lat: target.dataset.lat, lng: target.dataset.lng });
      }
      
    }

    return {
      map,
      searchOneApart
    };
  },
};
</script>
<style scoped>
#nav {
}
</style>