<template>
  <div class="modal">
    <div class="modal-header">
      <div>LANDING PAGE</div>
      <button class="modal-close-button" @click="$emit('close')">
        <img :src="cross" />
      </button>
    </div>
    <div class="modal-body">
      <landing :fetchedData="this.fetched" :configs="this.configs" />
    </div>
  </div>
</template>

<script>
import Landing from "@/views/Landing.vue";
import { cross } from "@/constants/images";

export default {
  name: "PreviewModal",
  props: ["fetchedData", "configs"],
  data() {
    return { cross, fetched: this.fetchedData, config: this.configs };
  },
  components: {
    Landing
  },
  methods: {}
};
</script>
