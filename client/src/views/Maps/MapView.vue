<template>
  <div id="nav">
    <button @click="map.addClusterer">클릭</button>
    <div id="map">hello</div>
  </div>
  <router-view />
</template>
<script>
import { onMounted } from "vue";
import Map from "@/store/Map";
export default {
  setup() {
    const map = new Map();
    onMounted(() => {
      map.initMap();
    });
    return {
      map,
    };
  },
};
</script>