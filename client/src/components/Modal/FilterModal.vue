<template lang="">
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div
          class="absolute inset-0 bg-gray-500 opacity-75"
          @click="onClickClose"
        ></div>
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-blue-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="font-bold text-lg leading-6 text-gray-900"
                id="modal-headline"
              >
                <!-- nickname: {{ authState.loginResponse.nickname }} -->
              </h3>
              <h3
                class="font-bold text-lg leading-6 text-gray-900"
                id="modal-headline"
              >
                <!-- email: {{ authState.loginResponse.email }} -->
              </h3>
              <div class="mt-2">
                <p class="text-lg font-extrabold text-gray-500">
                  원하는 목록을 선택해주세요
                </p>
                <p
                  v-for="region in REGION_LIST"
                  :key="region"
                  class="text-gray-500"
                >
                  {{ region }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <ModalButton content="SEARCH" @click="onSearch" />
          <ModalButton content="CLOSE" @click="onClickClose" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted } from "vue";
import ModalButton from "@/components/Buttons/ModalButton";
import { BaseModal } from "@/components/Modal/BaseModal";
import { REGION_LIST } from "@/store/Global";

export default {
  components: {
    ModalButton,
  },
  emits: ["onClickClose", "onSearch"],
  setup(_, { emit }) {
    const baseModal = new BaseModal(emit);
    function onClickModalClose() {
      baseModal.onClickModalClose();
    }
    async function onSearch() {
      console.log("search...");
      emit("onSearch", false);
    }
    function onClickClose() {
      emit("onClickClose", false);
    }
    onMounted(async () => {
      baseModal.onPressEsc();
      console.log(REGION_LIST);
    });
    return {
      onClickModalClose,
      onSearch,
      onClickClose,
      REGION_LIST,
    };
  },
};
</script>
<style lang=""></style>
