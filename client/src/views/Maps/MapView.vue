<template>
  <div class="flex flex-row">
    <div id="map" class="mr-6" @click="searchOneApart"></div>
    <div class="w-4/12" v-if="isRecommendation">
      <!-- <div class="my-6 text-xl text-center" @click="isRecommendation = !isRecommendation">추천목록</div> -->
      <div class="my-6 text-xl text-center font-extrabold">추천목록</div>
      <recommend-list class="" />
    </div>
    <!-- 추천목록을 누르면 작아지게 하고싶은데... -->
    <!-- <div class="w-1/12" v-else >
      <div class="my-6 text-xl text-center" @click="isRecommendation = !isRecommendation">추천목록</div>
      <recommend-list class="" v-if="isRecommendation" />
    </div> -->
  </div>
  <aparts-view class="w-4/7 ml-14" />
</template>
<script>
import { onMounted, watch, ref } from "vue";
import KakaoMap from "@/store/KakaoMap";
import ApartsView from "@/views/List/ApartsView.vue";
import RecommendList from "@/views/List/RecommendList.vue";
import searchStore from "@/store/Search";

export default {
  components: {
    ApartsView,
    RecommendList
  },
  setup() {
    let map = new KakaoMap();
    const currentApart = searchStore.getCurrentApart();
    const isRecommendation = ref(true);

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

    function onClickRecommendation() {
      console.log('onClickRecommendation');
      // isRecommendation.value = true;
    }
    return {
      map,
      searchOneApart,
      onClickRecommendation,
      isRecommendation
    };
  },
};
</script>
<style scoped>
#map {
  margin-left: 30px;
  margin-top: 10px;
  width: 70%;
  height: 500px;
  align-content: center;
}
</style>
