<template>
  <spin-loader v-if="isLoading" />
  <div class="mainAdminContainer" v-else>
    <div class="adminChalInfo">
      <div class="infoDetails">
        <span class="name">{{ chalDetails.name }}</span>
        <span class="category">{{ chalDetails.category }}</span>
        <button
          class="action-cta challenge-action-btn"
          @click="showEditChallModal = true"
        >
          <img :src="edit" /><span class="adminBanText">Edit</span>
        </button>
        <span
          class="status"
          :class="{
            deployed: chalDetails.status === 'Deployed',
            purged: chalDetails.status === 'Purged',
            undeployed: chalDetails.status === 'Undeployed',
          }"
          >{{ chalDetails.status }}</span
        >
      </div>
      <div class="infoStats">
        <vue-confirm-dialog class="manageChalConfirmBox"></vue-confirm-dialog>
        <div class="pointSolves">
          <div class="point">
            <span class="value">{{ chalDetails.points }}</span>
            <span class="field">Points</span>
          </div>
          <div class="solves">
            <span class="value">{{ chalDetails.solvesNumber }}</span>
            <span class="field">Solves</span>
          </div>
        </div>
        <div
          v-if="chalDetails.status === 'Deployed'"
          class="changeChallengeStatus"
        >
          <button
            class="action-cta challenge-action-btn"
            @click="manageChallenge(chalDetails.name, 'undeploy')"
          >
            <img :src="undeploy" /><span class="adminBanText">Undeploy</span>
          </button>
          <button
            class="action-cta challenge-action-btn"
            @click="manageChallenge(chalDetails.name, 'purge')"
          >
            <img :src="purge" /><span class="adminBanText">Purge</span>
          </button>
        </div>
        <div
          v-if="chalDetails.status === 'Undeployed'"
          class="changeChallengeStatus"
        >
          <button
            class="action-cta challenge-action-btn"
            @click="manageChallenge(chalDetails.name, 'deploy')"
          >
            <img :src="play" /><span class="adminBanText">Deploy</span>
          </button>
          <button
            class="action-cta challenge-action-btn"
            @click="manageChallenge(chalDetails.name, 'purge')"
          >
            <img :src="purge" /><span class="adminBanText">Purge</span>
          </button>
        </div>
        <div
          v-if="chalDetails.status === 'Purged'"
          class="changeChallengeStatus"
        >
          <button
            class="action-cta challenge-action-btn"
            @click="manageChallenge(chalDetails.name, 'deploy')"
          >
            <img :src="play" /><span class="adminBanText">Deploy</span>
          </button>
        </div>
      </div>
      <div class="chall-tags">
        <div v-for="tag in chalDetails.tags" :key="tag" class="category">
          {{ tag }}
        </div>
      </div>
      <div v-if="chalDetails.description" class="aboutChallenge aboutText">
        {{ chalDetails.description }}
      </div>
      <div
        v-for="port in this.chalDetails.ports"
        :key="port"
        class="host aboutText"
      >
        <a class="challenge-link" :href="getUrl(port)" target="_blank">
          {{ getUrl(port) }}
        </a>
      </div>
      <div class="challenge-links">
        <p class="link-heading">Asset Links</p>
        <a
          class="challenge-link aboutText"
          v-for="asset in this.chalDetails.assets"
          :href="asset"
          target="_blank"
          :key="asset"
        >
          {{ asset }}
        </a>
        <p class="link-heading">Additional Links</p>
        <a
          class="challenge-link"
          v-for="asset in this.chalDetails.additionalLinks"
          :href="asset"
          target="_blank"
          :key="asset"
        >
          {{ asset }}
        </a>
      </div>
    </div>
    <div class="adminChallStatistics">
      <div class="adminHeadingName">Statistics</div>
      <div class="adminChallStatisticsContent">
        <div class="leftCol">
          <div class="adminChallSubmissions">
            <div class="subheadingName">Submissions</div>
            <div class="info">
              Total {{ this.chalDetails.solvesNumber }} correct submissions are
              made
            </div>
          </div>
          <div class="adminChallSolves">
            <div class="subheadingName">Solve Percentages</div>
            <div class="info">
              There were total <b>{{ this.activeUsers }} Active</b> users, out
              of which,
              <b
                >{{ this.chalDetails.solvesNumber }} ({{
                  this.solvePercentage()
                }}%)</b
              >
              are able to solve this challenge.
            </div>
          </div>
        </div>
        <div class="rightCol">
          <BarGraphVertical
            :chartData="this.barData()"
            :options="this.barChartOptions()"
            class="graph"
            :height="200"
          />
        </div>
      </div>
    </div>
    <hr class="hrSeparator" />
    <div class="adminHeadingName">Submissions</div>
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[{ col: 'username', redirect: '/admin/users/' }]"
      :maxElementPerPage="10"
      v-if="rows.length > 0"
    />
    <div class="adminEmptyDataContainer" v-else>
      <span class="adminEmptyData">No Submissions</span>
    </div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showEditChallModal">
        <edit-chall-modal
          @close="showEditChallModal = false"
          :challenge="chalDetails"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import BarGraphVertical from "../components/BarGraphVertical.vue";
import AdminTable from "../components/adminTable.vue";
import UsersService from "../api/admin/usersAPI";
import SubmissionService from "../api/admin/submissionsAPI";
import ChalService from "../api/admin/challengesAPI";
import {
  tableCols,
  confimDialogMessages,
  barChartOptions,
  colors,
} from "../constants/constants";
import { play, purge, undeploy, edit } from "../constants/images";
import SpinLoader from "../components/spinLoader.vue";
import { CONFIG } from "@/config/config";
import EditChallModal from "../components/EditChallModal.vue";
export default {
  components: { BarGraphVertical, AdminTable, SpinLoader, EditChallModal },
  name: "AdminChallenge",
  data() {
    return {
      showEditChallModal: false,
      play,
      purge,
      undeploy,
      edit,
      loading: {
        usersNotFetched: true,
        challengeNotFetched: true,
        submissionsNotFetched: true,
      },
      tableCols: tableCols.adminChallenge,
      rows: [],
      chalDetails: {},
      confirmDialogs: confimDialogMessages(this.$route.params.id)
        .adminChallenge,
      hostUrl: this.$store.getters.hostUrl,
    };
  },
  computed: {
    isLoading: function () {
      for (let apiState in this.loading) {
        if (this.loading[apiState]) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    getUrl(port) {
      let url = CONFIG.beastRoot;
      let portIndex = url.lastIndexOf(":");
      if (portIndex !== -1) {
        url = url.substring(0, portIndex);
      }
      return `${url}:${port}`;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    barData() {
      return {
        datasets: [
          {
            backgroundColor: colors.singleBarGraph,
            data: [this.solvePercentage()],
          },
        ],
      };
    },
    barChartOptions() {
      return barChartOptions().challenges;
    },
    solvePercentage() {
      return (this.chalDetails.solvesNumber / this.activeUsers) * 100;
    },
    manageChallenge(name, action) {
      let confirmHandler = (confirm) => {
        if (confirm) {
          ChalService.manageChalAction(name, action).then(async (response) => {
            if (response.status !== 200) {
              console.log(response.data);
            } else {
              if (action === "purge") {
                this.loading.challengeNotFetched = true;
                await this.sleep(1000);
                this.loading.challengeNotFetched = false;
                this.$router.push("/admin/challenges");
              }
              if (action === "deploy") {
                let challengeDeployed = false;
                while (!challengeDeployed) {
                  if (this.$route.name !== "adminChallenge") {
                    break;
                  }
                  ChalService.fetchChallengeByName(this.$route.params.id).then(
                    (response) => {
                      let data = response.data;
                      this.chalDetails = data;
                      challengeDeployed = data.status === "Deployed";
                    }
                  );
                  await this.sleep(5000);
                }
              }
              if (action === "undeploy") {
                let challengeDeployed = false;
                while (!challengeDeployed) {
                  if (this.$route.name !== "adminChallenge") {
                    break;
                  }
                  ChalService.fetchChallengeByName(this.$route.params.id).then(
                    (response) => {
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
          });
        }
      };
      let inputParams = {
        title: this.confirmDialogs[action].title,
        message: this.confirmDialogs[action].message,
        button: this.confirmDialogs[action].button,
        callback: confirmHandler,
      };
      this.$confirm(inputParams);
    },
  },
  mounted() {
    UsersService.getUserStats()
      .then((response) => {
        this.activeUsers = response.data.unbanned_users;
      })
      .finally(() => {
        this.loading.usersNotFetched = false;
      });
    ChalService.fetchChallengeByName(this.$route.params.id)
      .then((response) => {
        let data = response.data;
        this.chalDetails = data;
      })
      .finally(() => {
        this.loading.challengeNotFetched = false;
      });

    SubmissionService.getSubmissions()
      .then((response) => {
        response.forEach((element) => {
          if (element.name == this.$route.params.id) {
            this.rows.push({
              username: element.username,
              timeDateRight: element.solvedAt,
            });
          }
        });
      })
      .finally(() => {
        this.loading.submissionsNotFetched = false;
      });
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminChallenges");
  },
};
</script>
