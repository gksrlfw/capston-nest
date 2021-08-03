<template>
<div class="ml-10">
  <h1 class="mb-10 mt-9">
    <div class="text-4xl">{{ currentApart.apart + " (" + currentApart.dong + ") " }}</div>
    <small class="">built at {{ currentApart.built_at }}</small>
  </h1>
  <section class="flex flex-row mb-10">
    <div class="inline w-1/3">
    <div>
      <!-- <div class="mb-10 mt-9"> -->
        <!-- <table class="table-fixed w-full border-collapse border-2 border-gray-500">
          <thead>
            <tr class="text-left p-10">
              <th class="w-2/4 pl-2">아파트 이름</th>
              <th class="w-1/4 pl-2">건축일자</th>
              <th class="w-1/4 pl-2">주소</th>
            </tr>
          </thead>
          <tbody class="border-collapse border-2 border-gray-500">
            <tr>
              <td class="pl-2">{{ currentApart.apart }}</td>
              <td class="pl-2">{{ currentApart.built_at }}</td>
              <td class="pl-2">{{ currentApart.dong }}</td>
            </tr>
          </tbody>
        </table> -->
      </div>
      <table class="table-fixed w-full border-collapse border-2 border-gray-500 mb-32">
        <thead>
          <tr class="text-left p-10">
            <th class="pl-2">전용면적</th>
            <th class="pl-2">평균 거래가</th>
          </tr>
        </thead>
        <tbody v-for="value in currentDisplayValues" :key="value[0]" class="border-collapse border-2 border-gray-500">
          <td class="pl-2">{{value[0]}}</td>
          <td class="pl-2">{{calculatedWon(value[1])}}</td>
        </tbody>
      </table>
    </div>
    <!-- <table class="table-fixed border-collapse border-2 border-gray-500 w-5/12 ml-10 mb-10 mt-9 h-1"> -->
    <table class="table-fixed border-collapse border-2 border-gray-500 w-6/12 ml-10 h-1">
      <thead>
        <tr class="text-left p-10">
          <th class="w-1/6 pl-2">전용면적</th>
          <th class="w-2/6 pl-2">가격</th>
          <th class="w-1/6 pl-2">층 수</th>
          <th class="w-2/6 pl-2">거래일자</th>
        </tr>
      </thead>
      <tbody class="border-collapse border-2 border-gray-500" v-for="eachArea in currentAparts" :key="eachArea[0]">
        <tr v-for="apart in eachArea.value" :key="apart.name">
          <td class="pl-2">{{ apart.area }}</td>
          <td class="pl-2">{{ calculatedWon(apart.price) }}</td>
          <td class="pl-2">{{ apart.floor }}</td>
          <td class="pl-2">{{ apart.traded_at.split('T')[0] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</div>
</template>
<script>
import { onMounted, watch, ref } from "vue";
import searchStore from "@/store/Search";

export default {
  setup() {
    const currentAparts = searchStore.getCurrentAparts();
    const currentDisplayValues = ref('');
    const currentApart = ref('')  // 간단한 데이터

    /**
     * 현재 선택된 아파트 목록이 들어있습니다.
     * TODO
     */
    watch(() => currentAparts.value, () => {
      currentAparts.value.map(v => v.area = Number(v.area));
      currentAparts.value = currentAparts.value.sort((a, b) => a.area - b.area);
      calculatedAvg();
    });

    onMounted(() => calculatedAvg());

    /**
     * 평균 거래가를 계산합니다.
     */
    function calculatedAvg() {
      // if(!currentApart.value) return;
      let arr = [], sum = 0;
      currentApart.value = currentAparts.value[0].value[0];
      console.log('ㅁㄴㅇㄹㅁㄴㅇㄹ', currentAparts.value);
      currentAparts.value.map(apart => {
        sum = 0;
        apart.value.map(data => {
          sum += Number(data.price);
        });
        arr.push([apart.area, Math.floor(sum/apart.value.length)]);
      });
      currentDisplayValues.value = arr;
    }

    /**
     * 가격을 ~억 ~천만 으로 표현합니다.
     */
    function calculatedWon(money) {
      let strMoney = money.toString();
      let res = "";
      if(strMoney.length === 6) {
        res = `${strMoney.substring(0, 2)}억 ${strMoney[2]}천만`;
      }
      if(strMoney.length === 5) {
        res = `${strMoney.substring(0, 1)}억 ${strMoney[1]}천만`;
      }
      return res;
    }
    return {
      currentAparts,
      currentApart,
      currentDisplayValues,
      calculatedWon
    };
  },
};
</script>
<style scoped>

</style>