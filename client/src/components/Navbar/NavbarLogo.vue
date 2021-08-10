<template lang="" class="">
  <!-- Logo text or image -->
  <div class="flex items-center justify-between md:mb-0 hidden md:block">
    <h1 class="leading-none text-2xl text-grey-darkest">
      <a class="no-underline text-grey-darkest hover:text-black" >
        안방
      </a>
    </h1>

    <a class="text-black hover:text-orange md:hidden" href="#">
      <i class="fa fa-2x fa-bars"></i>
    </a>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import { onMounted, ref } from "vue";
import authStore from "@/store/Auth";

export default {
  setup() {
    const authState = ref('');
    onMounted(() => {
      authState.value = authStore.getAuthState();
    });
    return {
      authState
    }
  },
};
</script>
<style lang=""></style>
