<template>
  <div class="challengesByTag">
    <div class="challengesByTag-tag">{{ tag }}</div>
    <div class="challengesByTag-challenges">
      <div
        class="challengesByTag-challenge"
        v-for="chall in challenges"
        :key="chall.id"
        @click="emitChallName(chall.name)"
      >
        <p class="challengesByTag-challName">{{ chall.name }}</p>
        <p class="challengesByTag-challInfo">
          {{ chall.points }} Points | {{ chall.solves.length }} Solves
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChallengesByTag",
  props: ["tag", "challenges"],
  methods: {
    emitChallName(challName) {
      this.$emit("clicked", challName);
    }
  }
};
</script>
