<template>
  <div>
    <p class="subfields">About<span class="importantField">*</span></p>
    <textarea
      v-model="content.about"
      placeholder="Enter the information to be displayed regarding competition"
    ></textarea>
    <p class="subfields">Prizes</p>
    <textarea
      v-model="content.prizes"
      placeholder="Enter the information to be displayed regarding prizes"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "ConfigContent",
  props: ["compContent"],
  data() {
    return {
      content: this.compContent
    };
  },
  methods: {
    emitContent(val) {
      this.$emit("changed", val);
    }
  },
  watch: {
    content: {
      handler: function(newVal) {
        this.emitContent(newVal);
      },
      deep: true
    },
    compContent: {
      handler(newVal) {
        this.content = newVal;
      }
    }
  }
};
</script>
