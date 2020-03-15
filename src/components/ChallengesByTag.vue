<template>
  <div class="challengesByTag">
    <div class="tag">{{ tag }}</div>
    <div class="challenges">
      <div class="challenge" v-for="chall in chall" :key="chall">
        <p class="challName">{{ chall.name }}</p>
        <p class="challInfo">
          {{ chall.points }} Points | {{ chall.solves }} Solves
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengesByTag",
  data() {
    return {
      tag: "PWN",
      chall: [
        {
          name: "Polynomial",
          points: "25",
          solves: "320",
          status: "solved"
        },
        {
          name: "sea_link",
          points: "255",
          solves: "3",
          status: "marked"
        },
        {
          name: "Mindbl0wn",
          points: "115",
          solves: "32",
          status: "marked"
        },
        {
          name: "Polynomial",
          points: "25",
          solves: "320",
          status: "solved"
        },
        {
          name: "Polynomial",
          points: "25",
          solves: "320",
          status: "solved"
        }
      ]
    };
  }
};
</script>
