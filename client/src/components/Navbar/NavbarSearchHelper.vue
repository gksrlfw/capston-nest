<template lang="">
  <div>
    {{ searchHelper }}
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
    watch(() => searchHelper, () => {
      console.log(searchHelper)
    })
    return {
      searchHelper
    }
  }
}
</script>
<style lang="">
  
</style>