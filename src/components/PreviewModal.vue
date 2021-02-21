<template>
  <div class="modal">
    <div class="modal-header">
      <div>LANDING PAGE</div>
      <button class="modal-close-button" @click="$emit('close')">
        <img :src="cross" />
      </button>
    </div>
    <div class="modal-body">
      <landing />
    </div>
  </div>
</template>

<script>
import Landing from "../views/Landing.vue";
import { cross } from "../constants/images";

export default {
  name: "PreviewModal",
  data() {
    return { cross };
  },
  components: {
    Landing
  },
  methods: {}
};
</script>
