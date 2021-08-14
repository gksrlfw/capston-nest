<template>
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col justify-center">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black">
        <h1 class="mb-8 text-3xl text-center font-bold">MY PAGE</h1>
        <!-- 나이, 성별, 그리고 아파트 평형, 가격, 지역을 feature로 사용하여, -->
        <div class="grid grid-flow-col grid-cols-3 grid-rows-4 gap-2 text-gray-700 font-extrabold">
          <div>USERNAME</div>
          <div>EMAIL</div>
          <div>AGE</div>
          <div>GENDER</div>
          <div class="text-indigo-500">{{ mypageData.username }}</div>
          <div class="text-indigo-500">{{ mypageData.email }}</div>
          <div class="text-indigo-500">{{ mypageData.age }}</div>
          <div class="text-indigo-500">{{ mypageData.gender }}</div>
        </div>
        <!-- <div class="flex flex-col">
          
          <span>username</span><span>asd</span>
          <div>email</div>
          <div>age</div>
          <div>gender</div>
        </div> -->
        <!-- <div><div class="p-5 w-16 inline">username</div><span>{{ mypageData.username }}</span></div>
        <div><span class="p-5">email</span><span>{{ mypageData.email }}</span></div>
        <div><span class="p-5 pr-8">age</span><span>{{ mypageData.age }}</span></div>
        <div><span class="p-5">gender</span><span>{{ mypageData.gender }}</span></div> -->
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
      console.log(mypageData.value)
    });

    return {
      mypageData
    }
  },
};
</script>
<style lang=""></style>
