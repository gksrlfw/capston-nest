<template>
  <navbar />
  <router-view />
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import { onMounted, ref } from "vue";
import authStore from "@/store/Auth";

export default {
  components: {
    Navbar,
    // ApartsView
  },
  setup() {
    const authState = ref('');
    onMounted(() => {
      authStore.refresh();
      authState.value = authStore.getAuthState();
      console.log(authState.value.signin)
    });
    return {
      authState
    }
  },
};
</script>
<style lang="scss">
#map {
  margin-left: 30px;
  margin-top: 10px;
  width: 90%;
  height: 500px;
  align-content: center;
}
</style>
