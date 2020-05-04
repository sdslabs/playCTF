<template>
  <div class="challenge">
    <StatsNavbar />
    <div class="chall">
      <div class="tags">
        <a class="tag" tag="Crypto">Crypto</a>
        <a class="tag" tag="PWN">PWN</a>
        <a class="tag" tag="Web">Web</a>
        <a class="tag" tag="Misc">Misc</a>
      </div>
      <ChallengesByTag />
      <ChallCard />
    </div>
  </div>
</template>

<script>
import StatsNavbar from "@/components/Stats.vue";
import ChallengesByTag from "@/components/ChallengesByTag.vue";
import ChallCard from "@/components/ChallCard.vue";
export default {
  name: "Challenges",
  components: {
    StatsNavbar,
    ChallengesByTag,
    ChallCard
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "Challenges");
  }
};
</script>
