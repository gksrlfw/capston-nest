<template lang="">
<div class="flex flex-col md:w-96">
  <form class="" @submit.prevent="search">
    <label class="hidden" for="search-form">Search</label>
    <input
      @keydown.esc="onPressEsc" 
      class="
        bg-grey-lightest
        border-2
        focus:border-orange
        p-2
        rounded-lg
        shadow-inner
        text-gray-700
        w-full
        
      "
      :value="userInput"
      @input="setUserinput"
      placeholder="Search"
      type="text"
    />
    <button class="hidden">Submit</button>
  </form>
  <!-- @TODO 부모요소에서 벗어나기... -->
  <div class="bg-white text-gray-700 p-5 rounded-md fixed top-20 bg-gray-50 shadow-2xl md:w-96 z-10" v-if="onSearchHelper" @click="onClickSearchHelper" > 
    <NavbarSearchHelper />
  </div>
  </div>
</template>
<script>
import {ref, watch} from "vue";
import searchStore from "@/store/Search";
import NavbarSearchHelper from "@/components/Navbar/NavbarSearchHelper";
export default {
  components: {
    NavbarSearchHelper
  },
  setup() {
    const userInput = ref('');
    const onSearchHelper = ref(false);
    /**
     * 한글같은 IME가 필요한 언어는 v-model로는 실시간 처리가 되지 않는다.
     * 이렇게 수동으로 해줘야 한다.
     */
    function setUserinput(e) {
      if(!onSearchHelper.value) onSearchHelper.value = true;
      userInput.value = e.target.value;
    }
    /**
     * 구, 가격은 필터링해야 될거같은데... 나중에 정하자
     */

    /**
     * search.. => 아파트 이름만 검색할 수 있도록 하자
     */
    function search() {
      console.log(userInput);
    }

    /**
     * 인풋이 바뀔때마다 서버에 요청하여 어떤 키워드가 있는지 표시해준다.
     * 시간되면 디바운싱 구현해보자
     */
    watch(() => userInput.value, async () => {
      await searchStore.setSearchHelper(userInput.value); 
    });

    /**
     * esc가 눌러지면 서치헬퍼를 닫는다.
     */
    function onPressEsc() {
      onSearchHelper.value = false;
    }

    async function onClickSearchHelper(e) {
      const arr = e.target.textContent.split(' ');
      const dong = arr[0].substring(1, arr[0].length).substring(0, arr[0].length-2);
      const apart = arr[1];
      onSearchHelper.value = false;
      await searchStore.searchOneApart({ dong, apart });
    }

    return {
      userInput,
      search,
      setUserinput,
      onPressEsc,
      onSearchHelper,
      onClickSearchHelper,
    }
  }
};
</script>
<style lang=""></style>
