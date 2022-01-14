<template>
  <div class="challenge-main-container" v-if="renderParam === '1'">
    <div class="adminChallengesVerticalNav tags">
      <a
        v-for="tag in tags"
        v-bind:key="tag.id"
        :class="{ navButton: true, active: selectedTag.name === tag.name }"
        :tag="tag.name"
        @click="changeFilter(tag)"
        >{{ tag.name }}
      </a>
    </div>
    <div class="challenge">
      <div class="chall-details">
        <StatsNavbar :details="userDetails" :total="totalChals" />
        <div class="chall">
          <ChallengesByTag
            :tag="this.selectedTag.name"
            :challenges="this.displayChallenges"
            :selectDefaultChallenge="selectDefaultChallenge"
            @clicked="selectChallenge"
          />
          <ChallCard
            :challDetails="selectedChall"
            @updateChallenges="
              () => {
                fetchChallenges(true);
                updateUserStats();
              }
            "
          />
        </div>
      </div>
    </div>
  </div>
  <beforeChallStart v-else-if="renderParam === '0'" />
  <afterChallOver v-else />
</template>

<script>
import store from "@/store/index";
import StatsNavbar from "@/components/Stats.vue";
import ChallengesByTag from "@/components/ChallengesByTag.vue";
import beforeChallStart from "@/components/beforeChallStart.vue";
import afterChallOver from "@/components/afterChallOver.vue";
import ChallCard from "@/components/ChallCard.vue";
import ChalService from "@/api/admin/challengesAPI";
import UsersService from "@/api/admin/usersAPI";
import { getChallenges } from "../utils/challenges";
export default {
  name: "Challenges",
  data() {
    return {
      tag: "All",
      challenges: [],
      displayChallenges: [],
      defaultTags: [{ name: "All", id: 1 }],
      selectedTag: { name: "All", id: 1 },
      challengesNotFetched: true,
      usersNotFetched: true,
      userDetails: {},
      totalChals: 0,
      selectedChall: {},
      selectDefaultChallenge: true,
      renderParam: "1"    
    };
  },
  components: {
    StatsNavbar,
    ChallengesByTag,
    ChallCard,
    afterChallOver,
    beforeChallStart
  },
  created() {
    this.username = store.getters.getUsername;
  },
  async mounted() {
    await this.fetchChallenges(false);
    await this.updateUserStats();
    console.log('hello');
  },
  methods: {
    async updateUserStats() {
      const userData = await UsersService.getUserByUsername(this.username);
      this.userDetails = userData.data;
      this.usersNotFetched = false;
    },
    async fetchChallenges(isUpdation) {
      const challData = await getChallenges(true, this.username);
      if(challData.error) {
        this.renderParam = challData.message;
        return;
      }
      console.log(challData);
      console.log(challData.error);
      console.log(challData.message);
      this.challenges = challData.challenges;
      this.tags = [...this.defaultTags, ...challData.tagFilterOptions];
      this.totalChals = challData.challenges.length;
      this.displayChallenges = challData.displayChallenges;
      if (!isUpdation) {
        this.selectedChall = this.displayChallenges[0];
      }
      this.challengesNotFetched = false;
      this.selectDefaultChallenge = false;
    },
    changeFilter(value) {
      this.selectedTag = value;
      if (value.name === "All") {
        this.displayChallenges = this.challenges;
      } else {
        this.displayChallenges = this.challenges.filter(challenge => {
          let includeChallenge = false;
          challenge.tags.forEach(tag => {
            if (tag === value.name) {
              includeChallenge = true;
            }
          });
          return includeChallenge;
        });
      }
    },
    selectChallenge(name) {
      if (name === null) {
        this.selectedChall = null;
      }
      this.selectedChall = this.challenges.filter(el => {
        return el.name == name;
      })[0];
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "userChallenges");
  }
};
</script>
