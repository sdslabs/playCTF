<template>
  <button class="button" :to="url" :disabled="disabled" v-on:click="onclick">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    url: String,
    text: String,
    disabled: Boolean,
    onclick: String
  }
};
</script>
