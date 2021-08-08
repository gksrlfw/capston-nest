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
        <div class="flex flex-row" v-else>
          <IconBell class="w-8 h-8 mr-4" @click="getMypage"  />
          <IconLogout class="w-8 h-8" @click="signout"  />
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import IconUser from "@/components/Icons/IconUser";
import IconLogout from "@/components/Icons/IconLogout";
import IconBell from "@/components/Icons/IconBell";
import authStore from "@/store/Auth";
import { useRouter } from "vue-router";

export default {
  components: {
    IconUser,
    IconLogout,
    IconBell
  },
  setup() {
    const router = new useRouter();
    const authState = authStore.getAuthState();
    async function signout() {
      await authStore.signout();
      return router.push({ name: "Signin" });
    }

    function getMypage() {
      console.log('my')
      return router.push({ name: "Mypage" });
    }
    return {
      authState,
      signout,
      getMypage
    };
  },
};
</script>
<style lang=""></style>
