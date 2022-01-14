<template>
  <div class="adminChallengesContainer">
    <div class="adminChallengesVerticalNav" v-if="!loading">
      <button
        v-for="tag in this.tagFilterOptions"
        :key="tag.id"
        class="navButton"
        @click="changeTagFilter(tag.name)"
        :class="{ active: tagFilter === tag.name }"
      >
        {{ tag.name }}
      </button>
    </div>
    <div class="mainContaineradminChall">
      <div class="adminHeadingChal">
        <div class="adminHeadingName">CHALLENGES</div>
        <button
          class="addChallenge primary-cta"
          @click="showCreateChallModal = true"
        >
          <img class="addImg" :src="add" />
          <span class="addText">Create New Challenge</span>
        </button>
      </div>
      <div class="adminSort">
        <span class="sortText">Sort by:</span>
        <a
          v-for="sort in this.sortTypeOptions"
          :key="sort.id"
          class="sortOption"
          :class="[{ active: sortType === sort.name }]"
          @click="changeSortType(sort.name)"
        >
          {{ sort.name }}
        </a>
        <v-select
          class="dropdown"
          :options="statusFilterOptions"
          :value="this.statusFilter"
          @input="changeStatusFilter"
          :clearable="false"
          :searchable="false"
        >
          <template #selected-option="item" class="selection">
            <span class="filterText">Filter By:</span
            ><span class="filterSelection">{{ item.label }}</span>
          </template>
        </v-select>
      </div>
      <spin-loader v-if="loading" />
      <div
        class="adminChallengesList"
        v-if="displayChallenges.length > 0 && !loading"
      >
        <admin-chall-card
          v-for="challenge in displayChallenges"
          :key="challenge.id"
          :challenge="challenge"
        />
      </div>
      <div
        class="adminEmptyDataContainer"
        v-if="displayChallenges.length === 0 && !loading"
      >
        <span class="adminEmptyData"
          >No {{ v2 + " " + v1 }} Challenges available</span
        >
      </div>
    </div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showCreateChallModal">
        <create-chall-modal @close="showCreateChallModal = false" />
      </div>
    </transition>
  </div>
</template>
<script>
import adminChallCard from "../components/adminChallCard.vue";
import ChalService from "../api/admin/challengesAPI";
import SpinLoader from "../components/spinLoader";
import { add } from "../constants/images";
import { challStatus } from "../constants/constants";
import CreateChallModal from "../components/CreateChallModal.vue";
import {
  getChalStats,
  getChallenges,
  getChalCategory
} from "../utils/challenges";
export default {
  name: "AdminChallenges",
  components: { adminChallCard, SpinLoader, CreateChallModal },
  data() {
    return {
      showCreateChallModal: false,
      add,
      v1: "",
      v2: "",
      challStatus,
      loading: true,
      statusFilter: "All",
      sortType: "Name",
      tagFilter: "All",
      challenges: [],
      displayChallenges: [],
      tagFilterOptions: [{ name: "All", id: 1 }],
      sortTypeOptions: [
        { name: "Name", id: 1 },
        { name: "Score", id: 2 },
        { name: "Solves", id: 3 }
      ],
      statusFilterOptions: ["All", "Undeployed", "Deployed", "InProgress"]
    };
  },
  async mounted() {
    let response = await getChallenges();
    this.challenges = response.challenges;
    this.displayChallenges = response.displayChallenges;
    this.tagFilterOptions = [
      ...this.tagFilterOptions,
      ...response.tagFilterOptions
    ];
    this.displayChallenges = response.displayChallenges;
    this.loading = false;
  },
  methods: {
    filterChallenges(challenges, filterValue, filterType) {
      if (filterValue === "All") {
        return challenges;
      }
      if (filterType === "tags") {
        this.v1 = filterValue;
        let filteredChallenges = challenges.filter(chall => {
          let includeChallenge = false;
          chall.tags.forEach(tag => {
            if (tag === filterValue) {
              includeChallenge = true;
            }
          });
          return includeChallenge;
        });
        return filteredChallenges;
      }
      if (filterType === "status") {
        let filteredChallenges = [];
        this.v2 = filterValue;
        switch (filterValue) {
          case "Deployed":
          case "Undeployed":
            filteredChallenges = challenges.filter(chall => {
              return chall[filterType] == filterValue;
            });
            break;
          case "InProgress":
            filteredChallenges = challenges.filter(chall => {
              return challStatus.inProgressStatus.includes(chall[filterType]);
            });
            break;
        }
        return filteredChallenges;
      }
    },
    sortChallenges(challenges, sortType) {
      let sortedChallenges = [];
      switch (sortType) {
        case "Name":
          sortedChallenges = challenges.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          break;
        case "Score":
          sortedChallenges = challenges.sort((a, b) => {
            return this.findGreater(a, b, "Points", "Name");
          });
          break;
        case "Solves":
          sortedChallenges = challenges.sort((a, b) => {
            return this.findGreater(a, b, "SolvesNumber", "Name");
          });
          break;
      }
      return sortedChallenges;
    },
    refreshChallengeList() {
      let filteredSortedChallenges = this.challenges;
      filteredSortedChallenges = this.filterChallenges(
        filteredSortedChallenges,
        this.tagFilter,
        "tags"
      );
      filteredSortedChallenges = this.filterChallenges(
        filteredSortedChallenges,
        this.statusFilter,
        "status"
      );
      filteredSortedChallenges = this.sortChallenges(
        filteredSortedChallenges,
        this.sortType
      );
      this.displayChallenges = filteredSortedChallenges;
    },
    changeStatusFilter(value) {
      this.statusFilter = value;
      this.refreshChallengeList();
    },
    changeSortType(value) {
      this.sortType = value;
      this.refreshChallengeList();
    },
    changeTagFilter(value) {
      this.tagFilter = value;
      this.refreshChallengeList();
    },
    findGreater(a, b, field1, field2) {
      if (a[field1] === b[field1]) {
        return a[field2] > b[field2] ? 1 : -1;
      }
      return b[field1] - a[field1];
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminChallenges");
  }
};
</script>
