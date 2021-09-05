import { ref } from "vue";

export const BASE_URL = `/api`;
export const TOKEN = `token`;
export const EMAIL = `EMAIL`;
export const AXIOS_OPTIONS = {
  withCredentials: true,
};

export const RECOMMEND_LISTS = ref({});   // id값만 들어있다
export const recommendLists = ref([]);    // 실제 apart 데이터를 의미한다
