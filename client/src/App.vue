<template>
  <navbar />
  <router-view />
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import { onMounted } from "vue";
import { TOKEN } from "@/store/Global";
import authStore from "@/store/Auth";

export default {
  components: {
    Navbar,
  },
  setup() {
    onMounted(() => {
      authStore.refresh();
    });
  },
};
</script>
<style lang="scss">
#map {
  width: 100%;
  height: 500px;
}
</style>
