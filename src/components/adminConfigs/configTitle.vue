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
    emitName(value) {
      this.$emit("changed", value);
    }
  },
  watch: {
    name: function(changedValue, prevValue) {
      if (changedValue != prevValue) {
        this.emitName(changedValue);
      }
    },
    compName: function(changedValue) {
      this.name = changedValue;
    }
  }
};
</script>
