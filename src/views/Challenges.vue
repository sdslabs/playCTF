<template>
  <div class="challenge-main-container">
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
</template>

<script>
import StatsNavbar from "@/components/Stats.vue";
import ChallengesByTag from "@/components/ChallengesByTag.vue";
import ChallCard from "@/components/ChallCard.vue";
import LoginUser from "../api/admin/authAPI.js";
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
      selectDefaultChallenge: true
    };
  },
  components: {
    StatsNavbar,
    ChallengesByTag,
    ChallCard
  },
  created() {
    this.username = LoginUser.getUserInfo().userName;
  },
  async mounted() {
    await this.fetchChallenges(false);
    await this.updateUserStats();
  },
  methods: {
    async updateUserStats() {
      const userData = await UsersService.getUserByUsername(this.username);
      this.userDetails = userData.data;
      this.usersNotFetched = false;
    },
    async fetchChallenges(isUpdation) {
      const challData = await getChallenges(true, this.username);
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
