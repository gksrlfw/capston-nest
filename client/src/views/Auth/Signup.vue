<template>
  <!-- min-h-screen: 100vh => 스크린 전체 -->
  <div class="bg-gray-200 min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col justify-center">
      <!-- 부모에서 padding을 줘서 내부 input이 w-full이 되어도 끝까지 오지 않도록 한다! -->
      <div class="bg-white px-6 py-8 rounded shadow-md text-black">
        <h1 class="mb-8 text-3xl text-center font-bold">SIGN UP</h1>
        <input
          type="email"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="email"
          placeholder="EMAIL"
          v-model="email"
        />
        <input
          type="text"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="username"
          placeholder="USERNAME"
          v-model="username"
        />
        <input
          type="password"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="password"
          placeholder="PASSWORD"
          v-model="password"
        />
        <input
          type="password"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="confirm_password"
          placeholder="CONFIRM PASSWORD"
          v-model="confirmPassword"
        />
        <input
          type="text"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="gu"
          placeholder="gu"
          v-model="gu"
        />
        <input
          type="test"
          class="border border-gray-300 w-full p-3 rounded mb-4"
          name="address"
          placeholder="address"
          v-model="address"
        />
        <div class="mb-2 text-red-500 font-bold" v-if="isEmptyValue">FILL IN ALL VALUE!</div>
        <div class="mb-2 text-red-500 font-bold" v-if="isMatchedPassword">CHECK YOUR PASSWORD!</div>
        <div class="mb-2 text-red-500 font-bold" v-if="authState.signupError">{{ authState.signupError }}</div>
        <!-- outline 없애기 (어디서 들어오는거지??)-->
        <button
          class="w-full py-3 rounded bg-gray-500 text-white hover:bg-gray-800 focus:outline-none my-1"
          @click="signup"
        >
          CREATE ACCOUNT
        </button>
      </div>
      <div class="text-gray-500 text-center mt-6">
        Already have an account?
        <router-link to="/signin" class="border-b border-blue-500 text-blue">SIGN IN</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import authStore from '@/store/Auth';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const email = ref('test@naver.com');
    const username = ref('123');
    const password = ref('testtest');
    const confirmPassword = ref('testtest');
    const gu = ref('강남구');
    const address = ref('역삼로 3-6 11길 조이빌');
    const isEmptyValue = ref(false);
    const isMatchedPassword = ref(false);
    const authState = authStore.getAuthState();
    function checkValidation() {
      authStore.clearError();
      isMatchedPassword.value = false;
      isEmptyValue.value = false;
      if (!email.value || !username.value || !password.value || !confirmPassword.value || !gu.value || !address.value) {
        isEmptyValue.value = true;
        return false;
      }
      if (password.value !== confirmPassword.value) {
        isMatchedPassword.value = true;
        return false;
      }
      return true;
    }
    async function signup() {
      try {
        if (!checkValidation()) return;
        const signupRequest = { 
          user: { 
            email: email.value, 
            username: username.value, 
            password: password.value,
            gu: gu.value,
            address: address.value
          }
        };
        await authStore.signup(signupRequest);
        if(authState.signupError) return;
        return router.push({ name: 'Home' });
      } catch (err) {
        console.error(err);
      }
    }
    return {
      email,
      username,
      password,
      confirmPassword,
      signup,
      isEmptyValue,
      isMatchedPassword,
      authState,
      gu,
      address
    };
  },
};
</script>
<style lang=""></style>