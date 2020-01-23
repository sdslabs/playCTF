<template>
  <a :href="url" class="button">
    {{ text }}
  </a>
</template>

<style scoped lang="scss">
@import "@/assets/scss/button.scss";
</style>

<script>
export default {
  name: "Button",
  props: {
    url: String,
    text: String
  }
};
</script>
