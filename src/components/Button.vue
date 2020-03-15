<template>
  <a :href="url" class="button">
    {{ text }}
  </a>
</template>

<script>
export default {
  name: "Button",
  props: {
    url: String,
    text: String
  }
};
</script>
