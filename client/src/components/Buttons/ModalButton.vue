<template lang="">
  <button
    type="button"
    class="
      text-black
      w-full
      inline-flex
      justify-center
      rounded-md
      border border-transparent
      shadow-sm
      px-4
      py-2
      bg-blue-50
      hover:bg-blue-200
      text-base
      font-medium
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
      sm:ml-3 sm:w-auto sm:text-sm
    "
  >
    {{ content }}
  </button>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang=""></style>
