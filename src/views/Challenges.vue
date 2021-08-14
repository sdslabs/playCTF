<template>
  <div v-if="displayPage">
    <div style="font-size:50px">&#128338;</div>
    <h1>scythe 2021 has not started yet.</h1>
  </div>
  <div v-else class="challenge-main-container">
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
            @clicked="selectChallenge"
          />
          <ChallCard
            :challDetails="this.displayChallenge"
            :tag="this.selectedTag.name"
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
import moment from "moment-timezone";

export default {
  name: "Challenges",
  data() {
    return {
      tag: "All",
      challenges: [],
      displayChallenges: [],
      tags: [{ name: "All", id: 1 }],
      selectedTag: { name: "All", id: 1 },
      challengesNotFetched: true,
      usersNotFetched: true,
      userDetails: {},
      totalChals: 0,
      selectedChall: {},
      startTime: this.$store.state.competitionInfo.startingTime,
      endTime: this.$store.state.competitionInfo.endingTime
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
    ChalService.getChallenges(true, this.username)
      .then(response => {
        this.challenges = response.challenges;
        this.displayChallenges = response.displayChallenges;
        this.tags = [...this.tags, ...response.categoryFilterOptions];
        this.totalChals = response.challenges.length;
        this.selectedChall = this.displayChallenges[0];
      })
      .finally(() => {
        this.challengesNotFetched = false;
      });
    // hardcoding user for now, need to fix after login integration
    UsersService.getUserByUsername(this.username)
      .then(response => {
        this.userDetails = response.data;
      })
      .finally(() => {
        this.usersNotFetched = false;
      });
  },
  methods: {
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
      if (name === null) {
        this.selectedChall = null;
      }
      this.selectedChall = this.challenges.filter(el => {
        return el.name == name;
      })[0];
    }
  },
  computed: {
    displayChallenge: function() {
      return this.selectedChall;
    },
    displayPage: function() {
      return (
        moment(this.startTime, "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd") >
        new Date().getTime()
      );
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "userChallenges");
  }
};
</script>
