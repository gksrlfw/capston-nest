<template lang="">
<div class="flex flex-col md:w-96">
  <form class="" @submit.prevent="search">
    <label class="hidden" for="search-form">Search</label>
    <input
      @keydown.up="onKeyUp"
      @keydown.down="onKeyDown"
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
  <div class="bg-white text-gray-700 p-5 rounded-md top-20 bg-gray-50 shadow-2xl md:w-96 z-10 absolute" v-if="onSearchHelper" @click="onClickSearchHelper" > 
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
    const searchHelperIndex = ref(0);
    const searchHelperElements = ref();
    const tempUserInput = ref('');

    /**
     * 한글같은 IME가 필요한 언어는 v-model로는 실시간 처리가 되지 않는다.
     * 이렇게 수동으로 해줘야 한다.
     */
    function setUserinput(e) {
      if(!onSearchHelper.value) onSearchHelper.value = true;
      userInput.value = e.target.value;
      tempUserInput.value = userInput.value;
      searchHelperIndex.value = 0;
    }

    /**
     * 구, 가격은 필터링해야 될거같은데... 나중에 정하자
     */

    /**
     * search.. => 아파트 이름만 검색할 수 있도록 하자
     * tempUserInput은 searchHelper에서 지정된 값으로,
     * 무조건 이걸로 검색하도록 만드는게 편할것같다..
     */
    function search() {
      let [dong, apart] = tempUserInput.value.split(' ');
      if(!dong || !apart) return alert('검색창에서 선택해주세요.');
      dong = dong.substring(0, dong.length-1);
      dong = dong.substring(1, dong.length);
      searchStore.searchOneApart({ dong, apart });
      onPressEsc();
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
      if(!e.target.textContent) return;
      const arr = e.target.textContent.split(' ');
      const dong = arr[0].substring(1, arr[0].length).substring(0, arr[0].length-2);
      const apart = arr[1];
      onSearchHelper.value = false;
      await searchStore.searchOneApart({ dong, apart });
    }

    /**
     * 포커스를 한 칸 아래로 내립니다.
     */
    function onKeyDown(e) {
      let value = '';
      if(!e?.target || !e?.target?.parentNode || !e?.target?.parentNode?.nextSibling || !e?.target?.parentNode?.nextSibling?.childNodes || !e.target.parentNode?.nextSibling?.childNodes[0]?.childNodes || !e.target.parentNode.nextSibling.childNodes[0]?.childNodes[0]?.childNodes) return;
      // 매 번 호출 안하도록 하려고 했지만 엮이는 부분이 많아서 포기.
      searchHelperElements.value = Array.from(e.target.parentNode.nextSibling.childNodes[0].childNodes[0].childNodes).filter(list => list.nodeName === 'LI');

      if(searchHelperIndex.value === searchHelperElements.value.length) {
        searchHelperElements.value[searchHelperIndex.value-1].classList.remove('bg-red-500');
        searchHelperIndex.value = 0;
      } 
      if(searchHelperIndex.value === 0) {
        searchHelperElements.value[searchHelperIndex.value].classList.add('bg-red-500');
        value = searchHelperElements.value[searchHelperIndex.value].textContent;
        searchHelperIndex.value = 1;
      }
      else {
        searchHelperElements.value[searchHelperIndex.value-1].classList.remove('bg-red-500');
        searchHelperElements.value[searchHelperIndex.value].classList.add('bg-red-500');
        value = searchHelperElements.value[searchHelperIndex.value].textContent;
        searchHelperIndex.value += 1;
      }
      
      tempUserInput.value = value;
    }
    /**
     * 포커스를 한 칸 위로 올립니다.
     */
    function onKeyUp(e) {
      let value = '';
      if(!e?.target || !e?.target?.parentNode || !e?.target?.parentNode?.nextSibling || !e?.target?.parentNode?.nextSibling?.childNodes || !e.target.parentNode?.nextSibling?.childNodes[0]?.childNodes || !e.target.parentNode.nextSibling.childNodes[0]?.childNodes[0]?.childNodes) return;
      searchHelperElements.value = Array.from(e.target.parentNode.nextSibling.childNodes[0].childNodes[0].childNodes).filter(list => list.nodeName === 'LI');

      if(searchHelperIndex.value === searchHelperElements.value.length) {
        searchHelperElements.value[searchHelperIndex.value].classList.remove('bg-red-500');
        searchHelperIndex.value = searchHelperElements.value.length-1;
      } 
      if(searchHelperIndex.value === 0) {
        searchHelperElements.value[searchHelperIndex.value].classList.remove('bg-red-500');
        searchHelperIndex.value = searchHelperElements.value.length - 1;
        searchHelperElements.value[searchHelperIndex.value].classList.add('bg-red-500');
        value = searchHelperElements.value[searchHelperIndex.value].textContent;
      }
      else {
        searchHelperElements.value[searchHelperIndex.value].classList.remove('bg-red-500');
        searchHelperIndex.value -= 1;
        searchHelperElements.value[searchHelperIndex.value].classList.add('bg-red-500');
        value = searchHelperElements.value[searchHelperIndex.value].textContent;
      }

      tempUserInput.value = value;
    }

    return {
      userInput,
      search,
      setUserinput,
      onPressEsc,
      onSearchHelper,
      onClickSearchHelper,
      onKeyDown,
      onKeyUp
    }
  }
};
</script>
<style lang=""></style>
