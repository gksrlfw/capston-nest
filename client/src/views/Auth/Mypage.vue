<template>
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col justify-center">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black">
        <h1 class="mb-8 text-3xl text-center font-bold">MY PAGE</h1>
        <!-- 나이, 성별, 그리고 아파트 평형, 가격, 지역을 feature로 사용하여, -->
          <div>닉네임 {{ mypageData.username }}</div>
          <div>나이 {{ mypageData.username }}</div>
          <div>성별 {{ mypageData.username }}</div>
          <div>주소 {{ mypageData.username }}</div>
      </div>
      <div class="text-gray-500 text-center mt-6">
        Want to see map?
        <router-link to="/map" class="border-b border-blue-500 text-blue"
        >MAP</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import {onMounted, ref} from "vue";
import authStore from "@/store/Auth";
export default {
  setup() {
    const mypageData = ref('');
    onMounted(async () => {
      mypageData.value = await authStore.getMypage();
    });

    return {
      mypageData
    }
  },
};
</script>
<style lang=""></style>
