<template>
  <input
    v-model="name"
    placeholder="Enter the name of competition to be displayed"
    class="adminFormTitle"
    @keyup.enter="triggerNext"
  />
</template>

<script>
export default {
  name: "ConfigTitle",
  props: ["compName"],
  data() {
    return {
      name: this.compName
    };
  },
  methods: {
    emitName(compInfoName) {
      this.$emit("changed", compInfoName);
    },
    triggerNext() {
      if (this.name) {
        this.$emit("triggerNext");
      }
    }
  },
  watch: {
    name: function(newCompInfoName, prevCompInfoName) {
      if (newCompInfoName != prevCompInfoName) {
        this.emitName(newCompInfoName);
      }
    },
    compName: function(newCompInfoName) {
      this.name = newCompInfoName;
    }
  }
};
</script>
