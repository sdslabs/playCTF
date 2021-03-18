<template>
  <div class="adminChallengesContainer">
    <div class="adminChallengesVerticalNav" v-if="!loading">
      <button
        v-for="category in this.categoryFilterOptions"
        :key="category.id"
        class="navButton"
        @click="changeCategory(category.name)"
        :class="{ active: categoryFilter === category.name }"
      >
        {{ category.name }}
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
          v-for="sort in this.sortFilterOptions"
          :key="sort.id"
          class="sortOption"
          :class="[{ active: sortFilter === sort.name }]"
          @click="changeSort(sort.name)"
        >
          {{ sort.name }}
        </a>
        <v-select
          class="dropdown"
          :options="statusFilterOptions"
          :value="this.statusFilter"
          @input="changeFilter"
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
        <span class="adminEmptyData">No Challenges available</span>
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
import CreateChallModal from "../components/CreateChallModal.vue";
export default {
  name: "AdminChallenges",
  components: { adminChallCard, SpinLoader, CreateChallModal },
  data() {
    return {
      showCreateChallModal: false,
      add,
      loading: true,
      statusFilter: "All",
      sortFilter: "Name",
      categoryFilter: "All",
      challenges: [],
      displayChallenges: [],
      categoryFilterOptions: [{ name: "All", id: 1 }],
      sortFilterOptions: [
        { name: "Name", id: 1 },
        { name: "Score", id: 2 },
        { name: "Solves", id: 3 }
      ],
      statusFilterOptions: ["All", "Deployed", "Undeployed"]
    };
  },
  mounted() {
    ChalService.getChallenges()
      .then(response => {
        this.challenges = response.challenges;
        this.displayChallenges = response.displayChallenges;
        this.categoryFilterOptions = [
          ...this.categoryFilterOptions,
          ...response.categoryFilterOptions
        ];
        this.displayChallenges = response.displayChallenges;
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    changeFilter(value) {
      this.statusFilter = value;
      if (value === "All") {
        this.displayChallenges = this.challenges;
      } else {
        this.displayChallenges = this.challenges.filter(el => {
          return el.status == value;
        });
      }
    },
    changeSort(value) {
      this.sortFilter = value;
      if (value === "Name") {
        this.displayChallenges = this.displayChallenges.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
      } else if (value === "Score") {
        this.displayChallenges = this.displayChallenges.sort((a, b) => {
          return this.findGreater(a, b, "Points", "Name");
        });
      } else if (value === "Solves") {
        this.displayChallenges = this.displayChallenges.sort((a, b) => {
          return this.findGreater(a, b, "SolvesNumber", "Name");
        });
      }
    },
    changeCategory(value) {
      this.categoryFilter = value;
      if (value === "All") {
        this.displayChallenges = this.challenges;
      } else {
        this.displayChallenges = this.challenges.filter(el => {
          return el.category == value;
        });
      }
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
