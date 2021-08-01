<template>
  <div id="nav" class="">
    <div id="map" class=""></div>
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
      console.log(currentApart.value);
      map.setLocation({ lat: currentApart.value.latitude, lng: currentApart.value.longitude });
    });

    onMounted(() => {
      map.initMap(() => map.addClusterer({ lat: 37.5642135, lng: 127.0016985 }));
    });

    return {
      map,
    };
  },
};
</script>
<style scoped>
#nav {
}
</style>