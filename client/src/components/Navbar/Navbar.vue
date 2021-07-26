<template lang="">
  <header class="bg-gray-500 text-gray-200 font-extrabold shadow-lg">
    <div
      class="
        container
        mx-auto
        md:flex md:items-center md:justify-between
        p-4
        pb-0
        md:pb-4
      "
    >
      <NavbarLogo />
      <NavbarSearch />
      <NavbarAuth />
      <NavbarSearchHelper />
    </div>
  </header>
</template>
<script>
import NavbarAuth from "@/components/Navbar/NavbarAuth";
import NavbarLogo from "@/components/Navbar/NavbarLogo";
import NavbarSearch from "@/components/Navbar/NavbarSearch";
import NavbarSearchHelper from "@/components/Navbar/NavbarSearchHelper";
export default {
  components: {
    NavbarAuth,
    NavbarLogo,
    NavbarSearch,
    NavbarSearchHelper
  },
};
</script>
<style lang=""></style>
