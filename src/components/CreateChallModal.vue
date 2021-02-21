<template>
  <div class="chall-modal">
    <div class="chall-modal-header">
      <div class="heading">CREATE NEW CHALLENGE</div>
      <button class="modal-close-button" @click="$emit('close')">
        <img :src="cross" />
      </button>
    </div>
    <div class="chall-modal-body">
      <config-logo />
    </div>
  </div>
</template>

<script>
import { cross } from "../constants/images";
import ConfigLogo from "./adminConfigs/configLogo.vue";

export default {
  name: "PreviewModal",
  data() {
    return { cross };
  },
  components: {
    ConfigLogo,
  },
  methods: {},
};
</script>
