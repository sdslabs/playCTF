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
            selected: selectedChallenge === chall.name,
            disabled: chall.status !== 'Deployed'
          }
        ]"
        @click="emitChallName(chall.name, chall.status)"
      >
        <img class="maintenance-msg" src="@/assets/maintenance-msg.svg" />
        <div class="challName">
          <p class="challengesByTag-challName">{{ chall.name }}</p>
          <img
            v-if="chall.isSolved && !(chall.status !== 'Deployed')"
            src="@/assets/tick.svg"
          />
          <img
            v-if="chall.status !== 'Deployed'"
            src="@/assets/maintenance.svg"
          />
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
    emitChallName(challName, challStatus) {
      if (challStatus !== "Deployed") {
        return;
      }
      this.selectedChallenge = challName;
      this.$emit("clicked", challName);
    }
  },
  watch: {
    challenges: function(challenges) {
      let emitted = false;
      challenges.forEach(el => {
        if (el.status === "Deployed") {
          if (!emitted) {
            this.selectedChallenge = el.name;
            this.$emit("clicked", el.name);
            emitted = true;
          }
        }
      });
      if (!emitted) {
        this.$emit("clicked", null);
      }
    }
  }
};
</script>
