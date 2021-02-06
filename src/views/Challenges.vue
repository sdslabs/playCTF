<template>
  <div class="challenge">
    <div class="chall-tags">
      <div class="tags">
        <a
          v-for="tag in tags"
          v-bind:key="tag"
          :class="{ tag: true }"
          :tag="tag"
          @click="hello(tag)"
          >{{ tag }}
        </a>
      </div>
    </div>
    <div class="chall-details">
      <StatsNavbar />
      <div class="chall">
        <ChallengesByTag :tag="this.selectedTag" @clicked="getChallName" />
        <ChallCard :challName="this.challName" :tag="this.selectedTag" />
      </div>
    </div>
  </div>
</template>

<script>
import StatsNavbar from "@/components/Stats.vue";
import ChallengesByTag from "@/components/ChallengesByTag.vue";
import ChallCard from "@/components/ChallCard.vue";
export default {
  name: "Challenges",
  data() {
    return {
      tags: ["Crypto", "PWN", "Web", "Misc", "Rev"]
    };
  },
  props: ["selectedTag", "challName"],
  components: {
    StatsNavbar,
    ChallengesByTag,
    ChallCard
  },
  methods: {
    hello: function(tag) {
      this.selectedTag = tag;
    },
    getChallName: function(challName) {
      this.challName = challName;
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "Challenges");
    this.selectedTag = this.tags[0];
  }
};
</script>
