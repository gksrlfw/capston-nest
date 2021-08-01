<template lang="">
  <nav class="md:block hidden">
    <ul class="list-reset md:flex md:items-center">
      <li class="md:ml-4">
        <router-link
          v-if="!authState.isSignin"
          to="/"
          class="
            block
            no-underline
            hover:underline
            py-2
            text-grey-darkest
            hover:text-black
            md:border-none md:p-0
          "
        >
          <IconUser class="w-8 h-8" />
        </router-link>
        <IconLogout class="w-8 h-8" @click="signout" v-else />
      </li>
      <!-- <li class="md:ml-4">
        <a class="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="#">
          About
        </a>
      </li>
      <li class="md:ml-4">
        <a class="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="#">
          Contact
        </a>
      </li> -->
    </ul>
  </nav>
</template>
<script>
import IconUser from "@/components/Icons/IconUser";
import IconLogout from "@/components/Icons/IconLogout";
import authStore from "@/store/Auth";
import { useRouter } from "vue-router";

export default {
  components: {
    IconUser,
    IconLogout,
  },
  setup() {
    const router = new useRouter();
    const authState = authStore.getAuthState();
    async function signout() {
      await authStore.signout();
      return router.push({ name: "Signin" });
    }
    return {
      authState,
      signout,
    };
  },
};
</script>
<style lang=""></style>
