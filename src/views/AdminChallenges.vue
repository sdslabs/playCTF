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
        <div class="left">
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
        </div>
        <div class="right">
          <div class="deployer-container">
            <button
              v-if="canDeploy === true"
              class="action-cta multiple-deployer-cta"
              :key="reload"
              @click="manageMultipleChallenge('deploy')"
            >
              <img src="@/assets/deployChallenges.svg" />
              <span class="tooltiptext">Deploy</span>
            </button>
            <button
              v-if="canUndeploy === true"
              class="action-cta multiple-deployer-cta"
              :key="reload"
              @click="manageMultipleChallenge('undeploy')"
            >
              <img class="addImg" src="@/assets/undeployChallenges.svg" />
              <span class="tooltiptext">Undeploy</span>
            </button>
          </div>
          <div class="deployer-container">
            <button
              v-if="canPurge === true"
              class="action-cta multiple-deployer-cta"
              :key="reload"
              @click="manageMultipleChallenge('purge')"
            >
              <img class="addImg" src="@/assets/purgeChallenges.svg" />
              <span class="tooltiptext">Purge</span>
            </button>
          </div>
          <button
            v-if="canPurge === false"
            class="action-cta"
            @click="selectAll()"
          >
            <span> Select All </span>
          </button>
          <button
            v-if="canPurge === true"
            class=" action-cta"
            @click="deselectAll()"
          >
            <span> Deselect All </span>
          </button>
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
      </div>
      <spin-loader v-if="loading" />
      <div
        class="adminChallengesList"
        v-if="displayChallenges.length > 0 && !loading"
        :key="reload"
      >
        <admin-chall-card
          v-for="challenge in displayChallenges"
          :key="challenge.id"
          :challenge="challenge"
          :checkedChallenge="challenge.checked"
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
    <vue-confirm-dialog class="manageChalConfirmBox"></vue-confirm-dialog>
  </div>
</template>
<script>
import adminChallCard from "@/components/adminChallCard.vue";
import ChalService from "@/api/admin/challengesAPI";
import SpinLoader from "@/components/spinLoader";
import { add } from "@/constants/images";
import {
  tableCols,
  confimDialogMessages,
  challStatus
} from "@/constants/constants";
import CreateChallModal from "@/components/CreateChallModal.vue";
import { CONFIG } from "@/config/config";
import {
  getChalStats,
  getChallenges,
  getChalCategory
} from "@/utils/challenges";
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
      reload: true,
      statusFilter: "All",
      sortType: "Name",
      tagFilter: "All",
      challenges: [],
      canDeploy: false,
      canPurge: false,
      canUndeploy: false,
      displayChallenges: [],
      checkedChallenges: [],
      typeOptions: [
        { name: "deploy", id: 1 },
        { name: "undeploy", id: 2 },
        { name: "purge", id: 3 }
      ],
      tagFilterOptions: [{ name: "All", id: 0 }],
      sortTypeOptions: [
        { name: "Name", id: 1 },
        { name: "Points", id: 2 },
        { name: "Solves", id: 3 }
      ],
      statusFilterOptions: ["All", "Undeployed", "Deployed", "InProgress"],
      tableCols: tableCols.adminChallenge,
      rows: [],
      chalDetails: {},
      hostUrl: this.$store.getters.hostUrl,
      sortAscending: 1,
      confirmDialogs: confimDialogMessages(this.$route.params.id)
        .adminChallenges
    };
  },
  computed: {
    isLoading: function() {
      for (let apiState in this.loading) {
        if (this.loading[apiState]) {
          return true;
        }
      }
      return false;
    }
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
    getUrl(port) {
      let url = CONFIG.beastRoot;
      let portIndex = url.lastIndexOf(":");
      if (portIndex !== -1) {
        url = url.substring(0, portIndex);
      }
      return `${url}:${port}`;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    sortChallenges(challenges, sortType) {
      let sortedChallenges = [];
      switch (sortType) {
        case "Name":
          sortedChallenges = challenges.sort((a, b) => {
            let res = a.name > b.name ? 1 : -1;
            return res * this.sortAscending;
          });
          break;
        case "Points":
          sortedChallenges = challenges.sort((a, b) => {
            return this.findGreater(a, b, "points", "name");
          });
          break;
        case "Solves":
          sortedChallenges = challenges.sort((a, b) => {
            return this.findGreater(a, b, "solvesNumber", "name");
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
      if (this.sortType === value) {
        this.sortAscending *= -1;
      }
      this.sortType = value;
      this.refreshChallengeList();
    },
    changeTagFilter(value) {
      this.tagFilter = value;
      this.refreshChallengeList();
    },
    findGreater(a, b, field1, field2) {
      if (a[field1] === b[field1]) {
        let res = a[field2] > b[field2] ? 1 : -1;
        return res * this.sortAscending;
      }
      return (b[field1] - a[field1]) * this.sortAscending;
    },
    canPurgeFunc() {
      for (let x of this.displayChallenges) {
        if (x.checked === true) {
          this.canPurge = true;
          return true;
        }
      }
      this.canPurge = false;
      return false;
    },
    canDeployFunc() {
      let flag = true;
      let i = 0;
      for (let x of this.displayChallenges) {
        if (x.checked === true) {
          flag = flag && x.status === "Undeployed";
          i++;
        }
      }
      if (i == 0) {
        this.canDeploy = false;
        return false;
      }
      this.canDeploy = flag;
      return this.canDeploy;
    },
    canUndeployFunc() {
      let flag = true;
      let i = 0;
      for (let x of this.displayChallenges) {
        if (x.checked === true) {
          flag = flag && x.status === "Deployed";
          i++;
        }
      }
      if (i == 0) {
        this.canUndeploy = false;
        return false;
      }
      this.canUndeploy = flag;
      return this.canUndeploy;
    },
    manageMultipleChallenge(action) {
      let confirmHandler = confirm => {
        if (confirm) {
          let allChallenges = [];
          this.displayChallenges.forEach(challenge => {
            if (challenge.checked) {
              allChallenges.push(challenge.name);
            }
          });
          ChalService.manageMultipleChalAction(
            allChallenges.join(","),
            action
          ).then(async response => {
            if (response.status === 200) {
              this.$vToastify.success(
                "Action triggered successfully",
                "Success"
              );
            } else {
              this.$vToastify.error("Server Error", "Error");
            }
            await this.sleep(5000);
            this.$router.go();
          });
        }
      };
      let inputParams = {
        title: this.confirmDialogs[action].title,
        message: this.confirmDialogs[action].message,
        button: this.confirmDialogs[action].button,
        callback: confirmHandler
      };
      this.$confirm(inputParams);
    },
    selectAll() {
      for (let x of this.displayChallenges) {
        x.checked = true;
      }
      this.reloadFunc();
    },
    deselectAll() {
      for (let x of this.displayChallenges) {
        x.checked = false;
      }
      this.reloadFunc();
    },
    reloadFunc() {
      this.reload = !this.reload;
      this.canPurgeFunc();
      this.canDeployFunc();
      this.canUndeployFunc();
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminChallenges");
  }
};
</script>
