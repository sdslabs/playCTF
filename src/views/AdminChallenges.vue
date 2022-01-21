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
            :class="[{ active: sortFilter === sort.name }]"
            @click="changeSortType(sort.name)"
          >
            {{ sort.name }}
          </a>
        </div>
        <div class="right">
          <div class="deployer-container">
            <button
              v-if="canDeploy() === true"
              class="action-cta multiple-deployer-cta"
              :key="reload"
              @click="manageMultipleChallenge('deploy')"
            >
              <img src="@/assets/deployChallenges.svg" />
              <span class="tooltiptext">Deploy</span>
            </button>
            <button
              v-if="canUndeploy() === true"
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
              v-if="canPurge() === true"
              class="action-cta multiple-deployer-cta"
              :key="reload"
              @click="manageMultipleChallenge('purge')"
            >
              <img class="addImg" src="@/assets/purgeChallenges.svg" />
              <span class="tooltiptext">Purge</span>
            </button>
          </div>
          <button
            v-if="canPurge() === false"
            class="action-cta"
            @click="selectAll()"
          >
            <span> Select All </span>
          </button>
          <button
            v-if="canPurge() === true"
            class=" action-cta"
            @click="deselectAll()"
          >
            <span> Deselect All </span>
          </button>
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
import { CONFIG } from "@/config/config";
import { tableCols, confimDialogMessages } from "../constants/constants";
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
      displayChallenges: [],
      checkedChallenges: [],
      typeOptions: [
        { name: "deploy", id: 1 },
        { name: "undeploy", id: 2 },
        { name: "purge", id: 3 }
      ],
      tagFilterOptions: [{ name: "All", id: 1 }],
      sortTypeOptions: [
        { name: "Name", id: 1 },
        { name: "Score", id: 2 },
        { name: "Solves", id: 3 }
      ],
      statusFilterOptions: [
        "All",
        "Undeployed",
        "Deployed",
        "InProgress",
        "Purged"
      ],
      tableCols: tableCols.adminChallenge,
      rows: [],
      chalDetails: {},
      confirmDialogs: confimDialogMessages(this.$route.params.id)
        .adminChallenge,
      hostUrl: this.$store.getters.hostUrl
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
    canPurge() {
      this.reload = !this.reload;
      for (let x of this.displayChallenges) {
        if (x.checked === true) {
          return true;
        }
      }
      return false;
    },
    canDeploy() {
      this.reload = !this.reload;
      let flag = true;
      let i = 0;
      for (let x of this.displayChallenges) {
        if (x.checked === true) {
          flag = flag && x.status === "Undeployed";
          i++;
        }
      }
      if (i == 0) return false;
      return flag;
    },
    canUndeploy() {
      this.reload = !this.reload;
      let flag = true;
      let i = 0;
      for (let x of this.displayChallenges) {
        if (x.checked === true) {
          flag = flag && x.status === "Deployed";
          i++;
        }
      }
      if (i == 0) return false;
      return flag;
    },
    manageMultipleChallenge(name) {
      this.reload = !this.reload;
      let final = "";
      let i = 0;
      for (let x of this.displayChallenges) {
        if (x.checked === true) {
          if (i == 0) {
            final = x.name;
          }
          if (i > 0) {
            final = x.name + "," + final;
          }
          i++;
          x.checked = false;
        }
      }
      if (i > 0) this.manageMultipleChallengeHandler(final, name);
    },
    manageMultipleChallengeHandler(name, action) {
      //let confirmHandler = (confirm) => {
      //if (confirm) {
      ChalService.manageMultipleChalAction(name, action).then(
        async response => {
          if (response.status !== 200) {
            console.log(response.data);
          } else {
            if (action === "purge") {
              this.loading.challengeNotFetched = true;
              await this.sleep(1000);
              this.loading.challengeNotFetched = false;
              this.$router.push("/admin/challenges/");
            }
            if (action === "deploy") {
              let challengesDeployed = false;
              while (!challengesDeployed) {
                if (this.$route.name !== "adminChallenge") {
                  break;
                }
                let names = this.$route.params.id.split(",");
                for (name of names) {
                  ChalService.fetchChallengeByName(name).then(response => {
                    let data = response.data;
                    this.chalDetails = data;
                    challengesDeployed &= data.status === "Deployed";
                  });
                  await this.sleep(5000);
                }
              }
            }
            if (action === "undeploy") {
              let challengeDeployed = false;
              while (!challengeDeployed) {
                if (this.$route.name !== "adminChallenge") {
                  break;
                }
                ChalService.fetchChallengeByName(this.$route.params.id).then(
                  response => {
                    let data = response.data;
                    this.chalDetails = data;
                    challengeDeployed = data.status === "Undeployed";
                  }
                );
                await this.sleep(5000);
              }
            } else {
              this.$router.go();
            }
          }
        }
      );
      //}
      //};
      //let inputParams = {
      //  title: this.confirmDialogs[action].title,
      //  message: this.confirmDialogs[action].message,
      //  button: this.confirmDialogs[action].button,
      //  callback: confirmHandler,
      //};
      //this.$confirm(inputParams);
    },
    selectAll() {
      for (let x of this.displayChallenges) {
        x.checked = true;
      }
      this.reload = !this.reload;
    },
    deselectAll() {
      for (let x of this.displayChallenges) {
        x.checked = false;
      }
      this.reload = !this.reload;
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminChallenges");
  }
};
</script>
