<template lang="">
  <div class="">
    <ul v-if="searchHelper.length" >
      <li v-for="item in searchHelper" :key="item.id" @keydown.enter="onSearchWithEnter">
        {{'('+item.dong+') ' +item.apart }}
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
    const searchHelper = searchStore.getSearchHelper();
    watch(() => searchHelper.value, () => {
      // console.log(searchHelper.value);
    });

    function onSearchWithEnter(e) {
      console.log(e.target);
    }

    return {
      searchHelper,
      onSearchWithEnter
    }
  }
}
</script>
<style lang="">
  
</style>