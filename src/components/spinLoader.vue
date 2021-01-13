<template>
  <loader
    class="loader"
    line-fg-color="$theme-color-violet"
    line-bg-color="$theme-color-grey-low-transp"
    message="LOADING"
    :size="50"
    :spacing="20"
    :font-size="32"
    text-fg-color="$theme-color-grey-high-transp"
  />
</template>

<script>
export default {
  name: "spinLoader"
};
</script>
