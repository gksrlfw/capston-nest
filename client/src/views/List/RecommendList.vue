<template>
  <div class="py-4 px-8 bg-white shadow-lg rounded-lg my-2 mr-2" v-for="list in recommendLists" :key="list.dong+list.apart">
    <div class="grid grid-flow-col grid-cols-2"  @click="onClickRecommendation(list.dong, list.apart)">
      <span class="text-gray-800 text-base font-semibold">{{ list.apart + '(' + list.dong + ')'}}</span>
      <span class="text-sm font-medium text-indigo-500 justify-end text-left ">{{ '최근 거래가:        ' + list.price }}</span>
    </div>
    <!-- <div class="flex justify-end mt-4">
      <p class="text-sm font-medium text-indigo-500">{{ '최근 거래가:        ' + list.price }}</p>
    </div> -->
  </div>
</template>
<script>
import { watch, ref } from "vue";
import { RECOMMEND_LISTS } from "@/store/Global";
import searchStore from "@/store/Search";

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
    const currentApart = ref('');

    watch(() => RECOMMEND_LISTS.value, async () => {
      console.log('asdfadf', RECOMMEND_LISTS.value);
      recommendLists.value = await searchStore.getApartsWithIds(RECOMMEND_LISTS.value);
      console.log(recommendLists.value);
    })

    // watch(() => currentApart.value, () => {
    //   map.setLocation({ lat: currentApart.value.latitude, lng: currentApart.value.longitude });
    // });

    function onClickRecommendation(dong, apart) {
      console.log(dong, apart);
      dong = '장충동1가';
      apart = '장충동라임카운티';
      searchStore.searchOneApart({ dong, apart });
    }
    return {
      recommendLists,
      onClickRecommendation,
      RECOMMEND_LISTS
    }
  },
};
</script>
<style scoped>

</style>
