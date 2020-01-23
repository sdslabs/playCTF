<template>
  <div class="challenge">
    <div class="stats">
      <div class="fixedStat">
        <p class="number">24</p>
        <p class="text">Total Challenges</p>
      </div>
      <div class="dynamicStats">
        <p class="number">14</p>
        <p class="text">Solved</p>
      </div>
      <div class="dynamicStats">
        <p class="number">10</p>
        <p class="text">Unsolved</p>
      </div>
      <div class="dynamicStats">
        <p class="number">14</p>
        <p class="text">Unattempted</p>
      </div>
      <img src="@/assets/images/Avatar.svg" class="image" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/statsNavbar.scss";
</style>

<script>
export default {
  name: "StatsNavbar",
};
</script>
