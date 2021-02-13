<template>
  <div class="configureContent">
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
    emitContent(value) {
      this.$emit("changed", value);
    }
  },
  watch: {
    content: {
      handler: function(changedValue) {
        this.emitContent(changedValue);
      },
      deep: true
    },
    compContent: {
      handler(changedValue) {
        this.content = changedValue;
      }
    }
  }
};
</script>
