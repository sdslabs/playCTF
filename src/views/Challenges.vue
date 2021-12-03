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
            :tag="this.selectedTag.name"
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
import store from "@/store/index";
import StatsNavbar from "@/components/Stats.vue";
import ChallengesByTag from "@/components/ChallengesByTag.vue";
import ChallCard from "@/components/ChallCard.vue";
import ChalService from "../api/admin/challengesAPI";
import UsersService from "../api/admin/usersAPI";
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
    this.username = store.getters.getUsername;
  },
  mounted() {
    this.fetchChallenges(false);
    this.updateUserStats();
  },
  methods: {
    updateUserStats() {
      UsersService.getUserByUsername(this.username)
        .then(response => {
          this.userDetails = response.data;
        })
        .finally(() => {
          this.usersNotFetched = false;
        });
    },
    fetchChallenges(isUpdation) {
      ChalService.getChallenges(true, this.username)
        .then(response => {
          this.challenges = response.challenges;
          this.tags = [...this.defaultTags, ...response.categoryFilterOptions];
          this.totalChals = response.challenges.length;
          this.displayChallenges = response.displayChallenges;
          if (!isUpdation) {
            this.selectedChall = this.displayChallenges[0];
          }
        })
        .finally(() => {
          this.challengesNotFetched = false;
          this.selectDefaultChallenge = false;
        });
    },
    changeFilter(value) {
      this.selectedTag = value;
      if (value.name === "All") {
        this.displayChallenges = this.challenges;
      } else {
        this.displayChallenges = this.challenges.filter(el => {
          return el.category == value.name;
        });
      }
    },
    selectChallenge(name) {
      console.log(name);
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
