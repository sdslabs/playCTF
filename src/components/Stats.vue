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
        console.log('No challenges');
        return 0;
      }
      console.log('Challenges:', JSON.stringify(this.challenges, null, 2));
      // Get unique solved challenge IDs
      const solvedChallenges = this.challenges.filter(chall => {
        console.log('Challenge:', chall.id, 'isSolved:', chall.isSolved);
        return chall.isSolved === true;
      });
      console.log('Solved challenges:', solvedChallenges);
      return solvedChallenges.length;
    }
  }
};
</script>
