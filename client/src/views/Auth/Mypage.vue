<template>
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col justify-center">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black">
        <h1 class="mb-8 text-3xl text-center font-bold">MY PAGE</h1>
        <table class="table-fixed w-full border-collapse border-2 border-gray-500 mb-32">
          <thead>
          <tr class="text-left p-10">
            <th class="pl-2">전용면적</th>
            <th class="pl-2">평균 거래가 {{mypageData}}</th>
          </tr>
          </thead>
<!--          <tbody v-for="value in currentDisplayValues" :key="value[0]" class="border-collapse border-2 border-gray-500">-->
<!--          <td class="pl-2">{{value[0]}}</td>-->
<!--          <td class="pl-2">{{calculatedWon(value[1])}}</td>-->
<!--          </tbody>-->
        </table>
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
import { useRouter } from "vue-router";
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
