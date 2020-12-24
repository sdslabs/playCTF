<template>
  <div class="modal">
    <div class="modal-heading">
      Stuck somewhere?
    </div>
    <div class="modal-desc">
      Discussing the problem with the admins might help.
    </div>
    <Button class="modal-discord-button" text="n00bCTF" />
    <Button class="modal-cancel-button" text="Cancel" @click="close" />
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "Modal",
  components: {
    Button
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
