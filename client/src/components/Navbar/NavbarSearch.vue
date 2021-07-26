<template lang="">
  <form class="mb-4 w-full md:mb-0 md:w-1/2" @submit.prevent="search">
    <label class="hidden" for="search-form">Search</label>
    <input
      class="
        bg-grey-lightest
        border-2
        focus:border-orange
        p-2
        rounded-lg
        shadow-inner
        w-full
      "
      :value="userInput"
      @input="setUserinput"
      placeholder="Search"
      type="text"
    />
    <button class="hidden">Submit</button>
  </form>
</template>
<script>
import {ref, watch} from "vue";
import searchStore from "@/store/Search";

export default {
  setup() {
    const userInput = ref('');

    /**
     * 한글같은 IME가 필요한 언어는 v-model로는 실시간 처리가 되지 않는다.
     * 이렇게 수동으로 해줘야 한다.
     */
    function setUserinput(e) {
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

    return {
      userInput,
      search,
      setUserinput
    }
  }
};
</script>
<style lang=""></style>
