<template>
  <div class="stats">
    <div class="rank">
      <p class="text">Rank</p>
      <p class="number">{{ details.rank }}</p>
    </div>
    <div class="dynamicStats">
      <p class="number">{{ total }}</p>
      <p class="text">Total</p>
    </div>
    <div class="dynamicStats">
      <p class="number">{{ details.challenges.length }}</p>
      <p class="text">Solved</p>
    </div>
    <div class="dynamicStats">
      <p class="number">{{ total - details.challenges.length }}</p>
      <p class="text">Unsolved</p>
    </div>
    <img src="@/assets/Avatar.svg" class="image" />
  </div>
</template>

<script>
export default {
  name: "StatsNavbar",
  props: ["details", "total"]
};
</script>
