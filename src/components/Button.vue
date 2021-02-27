<template>
  <button :class="variant" :to="url" :disabled="disabled" v-on:click="onclick">
    <img v-if="icon" class="img" :src="icon" />{{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["url", "text", "disabled", "onclick", "icon", "variant"],
};
</script>
