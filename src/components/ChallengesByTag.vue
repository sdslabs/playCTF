<template>
  <div class="challengesByTag">
    <div class="challengesByTag-tag">{{ tag }}</div>
    <div class="challengesByTag-challenges">
      <div
        class="challengesByTag-challenge"
        v-for="chall in chall"
        :key="chall"
        @click="emitChallName(chall.name)"
      >
        <p class="challengesByTag-challName">{{ chall.name }}</p>
        <p class="challengesByTag-challInfo">
          {{ chall.points }} Points | {{ chall.solves }} Solves
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengesByTag",
  props: ["tag"],
  data() {
    return {
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
        },
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
  },
  methods: {
    emitChallName(challName) {
      this.$emit("clicked", challName);
    }
  }
};
</script>
