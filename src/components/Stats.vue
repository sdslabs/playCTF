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
      <p class="number">{{ getSolvedCount }}</p>
      <p class="text">Solved</p>
    </div>
    <div class="dynamicStats">
      <p class="number">{{ total - getSolvedCount }}</p>
      <p class="text">Unsolved</p>
    </div>
    <img src="@/assets/Avatar.svg" class="image" />
  </div>
</template>

<script>
export default {
  name: "StatsNavbar",
  props: ["details", "total", "challenges"],
  computed: {
    getSolvedCount() {
      if (!this.challenges) {
        return 0;
      }
      // Get unique solved challenge IDs
      const solvedChallenges = this.challenges.filter(chall => {
        return chall.isSolved === true;
      });
      return solvedChallenges.length;
    }
  }
};
</script>
