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
    emitContent(compInfoContent) {
      this.$emit("changed", compInfoContent);
    }
  },
  watch: {
    content: {
      handler: function(newCompInfoContent) {
        this.emitContent(newCompInfoContent);
      },
      deep: true
    },
    compContent: {
      handler(newCompInfoContent) {
        this.content = newCompInfoContent;
      }
    }
  }
};
</script>
