<template>
  <div class="challenge">
    <div class="chall-tags">
      <div class="tags">
        <a
          v-for="tag in tags"
          v-bind:key="tag.id"
          :class="{ tag: true }"
          :tag="tag.name"
          @click="changeFilter(tag)"
          >{{ tag.name }}
        </a>
      </div>
    </div>
    <div class="chall-details">
      <StatsNavbar :details="userDetails" :total="totalChals" />
      <div class="chall">
        <ChallengesByTag
          :tag="this.selectedTag.name"
          :challenges="displayChallenges"
          @clicked="selectChallenge"
        />
        <ChallCard
          :challDetails="this.displayChallenge"
          :tag="this.selectedTag.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
      tags: [{ name: "All", id: 1 }],
      selectedTag: { name: "All", id: 1 },
      challengesNotFetched: true,
      usersNotFetched: true,
      userDetails: {},
      totalChals: 0,
      selectedChall: {}
    };
  },
  components: {
    StatsNavbar,
    ChallengesByTag,
    ChallCard
  },
  mounted() {
    ChalService.getChallenges()
      .then(response => {
        this.challenges = response.challenges;
        this.displayChallenges = response.displayChallenges;
        this.tags = [...this.tags, ...response.categoryFilterOptions];
        this.displayChallenges = response.displayChallenges;
        this.totalChals = response.challenges.length;
        this.selectedChall = this.displayChallenges[0];
      })
      .finally(() => {
        this.challengesNotFetched = false;
      });
    // hardcoding user for now, need to fix after login integration
    UsersService.getUserByUsername("testplayer1")
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
      this.selectedChall = this.challenges.filter(el => {
        return el.name == name;
      })[0];
    }
  },
  computed: {
    displayChallenge: function() {
      return this.selectedChall;
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "Challenges");
  }
};
</script>
