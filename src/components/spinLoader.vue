<template>
  <loader
    class="loader"
    line-fg-color="#593C8F"
    line-bg-color="rgba(87, 87, 87, 0.1)"
    message="LOADING"
    :size="50"
    :spacing="20"
    :font-size="32"
    text-fg-color="rgba(87, 87, 87, 0.7)"
  />
</template>

<script>
export default {
  name: "spinLoader"
};
</script>
