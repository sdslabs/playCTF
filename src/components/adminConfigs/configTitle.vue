<template>
  <input
    v-model="name"
    placeholder="Enter the name of competition to be displayed"
    class="title"
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
