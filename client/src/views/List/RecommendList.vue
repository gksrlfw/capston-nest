<template>
  <div class="py-4 px-8 bg-white shadow-lg rounded-lg my-2 mr-2">
    <div class="">
      <h2 class="text-gray-800 text-base font-semibold">아파트 이름 (동)</h2>
      <p class="text-sm">built at ~~</p>
    </div>
    <div class="flex justify-end mt-4">
      <p class="text-sm font-medium text-indigo-500">최근 거래가: </p>
    </div>
  </div>
  <div class="py-4 px-8 bg-white shadow-lg rounded-lg my-2 mr-2">
    <div class="">
      <h2 class="text-gray-800 text-base font-semibold">아파트 이름 (동)</h2>
      <p class="text-sm">built at ~~</p>
    </div>
    <div class="flex justify-end mt-4">
      <p class="text-sm font-medium text-indigo-500">최근 거래가: </p>
    </div>
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
      try {
        // console.log(currentAparts, currentApart.value);
        if(!currentAparts) return;
        if(!currentAparts.value) return;
        let arr = [], sum = 0;
        currentApart.value = currentAparts.value[0].value[0];
        if(!currentApart.value) return;
        currentAparts.value.map(apart => {
          sum = 0;
          apart.value.map(data => {
            sum += Number(data.price);
          });
          arr.push([apart.area, Math.floor(sum/apart.value.length)]);
        });
        currentDisplayValues.value = arr;
      }
      catch(err) {
        console.error(err);
      }
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
