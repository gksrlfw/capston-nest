<template lang="">
  <div class="">
    <ul v-if="searchHelper.length" >
      <li v-for="item in searchHelper" :key="item.apart">
        {{ item }}
      </li>
    </ul>
    <ul v-else>
      <li>해당하는 아파트가 존재하지 않습니다.</li>
    </ul>
  </div>
</template>
<script>
import searchStore from "@/store/Search";
import { watch } from '@vue/runtime-core';

export default {
  setup() {
    /**
     * searchHelper를 바꿔도 실시간으로 표시되지 않는다... 왜지?? 고치기
     */
    const searchHelper = searchStore.getSearchHelper();
    watch(() => searchHelper.value, () => {
      console.log(searchHelper.value) 
    })
    return {
      searchHelper
    }
  }
}
</script>
<style lang="">
  
</style>