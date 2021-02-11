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
      name: ""
    };
  },
  methods: {
    emitName(val) {
      this.$emit("changed", val);
    }
  },
  watch: {
    name: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.emitName(newVal);
      }
    },
    compName: function(newval) {
      this.name = newval;
    }
  }
};
</script>
