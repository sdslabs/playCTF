<template>
  <div class="leaderboard">
    <div class="header">
      <div class="heading">LEADER <span class="board">BOARD</span></div>
      <searchbar />
    </div>
  </div>
</template>

<script>
import searchbar from "@/components/Searchbar.vue";
export default {
  name: "leaderboard",
  components: {
    searchbar
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/leaderboard.scss";
</style>
