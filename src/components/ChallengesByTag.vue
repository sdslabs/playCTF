<template>
  <div class="challengesByTag">
    <div class="challengesByTag-tag">{{ tag }}</div>
    <div class="challengesByTag-challenges">
      <div
        v-for="chall in challenges"
        :key="chall.id"
        :class="[
          {
            'challengesByTag-challenge': true,
            selected: selectedChallenge === chall.name
          }
        ]"
        @click="emitChallName(chall.name)"
      >
        <div class="challName">
          <p class="challengesByTag-challName">{{ chall.name }}</p>
          <img v-if="chall.isSolved" src="@/assets/tick.svg" />
        </div>
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
  data() {
    return {
      selectedChallenge: {}
    };
  },
  methods: {
    emitChallName(challName) {
      this.selectedChallenge = challName;
      this.$emit("clicked", challName);
    }
  },
  watch: {
    challenges: function(challenges) {
      this.selectedChallenge = challenges[0].name;
      this.$emit("clicked", challenges[0].name);
    }
  }
};
</script>
