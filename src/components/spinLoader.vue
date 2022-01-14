<template>
  <loader
    class="loader"
    :line-fg-color="themeColorViolet"
    :line-bg-color="themeColorGreyLowTransp"
    message="LOADING"
    :size="50"
    :spacing="20"
    :font-size="32"
    :text-fg-color="themeColorGreyHighTransp"
  />
</template>

<script>
import variables from "@/styles/main.scss";
export default {
  name: "spinLoader",
  data() {
    return {
      ...variables
    };
  }
};
</script>
