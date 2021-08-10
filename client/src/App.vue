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
    });
    return {
      authState
    }
  },
};
</script>
<style lang="scss">
</style>
