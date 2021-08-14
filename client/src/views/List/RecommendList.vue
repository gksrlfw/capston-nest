<template>
  <div class="py-4 px-8 bg-white shadow-lg rounded-lg my-2 mr-2" v-for="list in recommendLists" :key="list.dong+list.apart" @click="onClickRecommendation">
    <div class="">
      <h2 class="text-gray-800 text-base font-semibold">{{ list.apart + '(' + list.dong + ')'}}</h2>
      <p class="text-sm">{{ 'built at' + list.built_at }}</p>
    </div>
    <div class="flex justify-end mt-4">
      <p class="text-sm font-medium text-indigo-500">{{ '최근 거래가:        ' + list.price }}</p>
    </div>
  </div>
</template>
<script>
import { onMounted, watch, ref } from "vue";

export default {
  setup() {
    const recommendLists = ref([
      {
        dong: '사직동',
        built_at: '2007',
        apart: '삼정그린코아',
        price: '5억'
      },
      {
        dong: '사직2동',
        built_at: '2007',
        apart: '삼정그린코아',
        price: '5억'
      }
    ]);

    function onClickRecommendation() {
      console.log('asdf');
    }
    return {
      recommendLists,
      onClickRecommendation
    }
  },
};
</script>
<style scoped>

</style>
