<template>
  <spin-loader v-if="isLoading" />
  <div class="mainAdminContainer" v-else>
    <div class="adminChalInfo">
      <div class="infoDetails">
        <span class="name">{{ chalDetails.name }}</span>
        <span class="category">{{ chalDetails.category }}</span>
        <button class="adminBanButton">
          <img :src="edit" class="banImg" /><span class="adminBanText"
            >Edit</span
          >
        </button>
        <span
          class="status"
          :class="{
            deployed: chalDetails.status === 'Deployed',
            purged: chalDetails.status === 'Purged',
            undeployed: chalDetails.status === 'Undeployed'
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
            class="adminBanButton"
            @click="manageChallenge(chalDetails.name, 'undeploy')"
          >
            <img :src="undeploy" class="banImg" /><span class="adminBanText"
              >Undeploy</span
            >
          </button>
          <button
            class="adminBanButton"
            @click="manageChallenge(chalDetails.name, 'purge')"
          >
            <img :src="purge" class="banImg" /><span class="adminBanText"
              >Purge</span
            >
          </button>
        </div>
        <div
          v-if="chalDetails.status === 'Undeployed'"
          class="changeChallengeStatus"
        >
          <button
            class="adminBanButton"
            @click="manageChallenge(chalDetails.name, 'deploy')"
          >
            <img :src="play" class="banImg" /><span class="adminBanText"
              >Deploy</span
            >
          </button>
          <button
            class="adminBanButton"
            @click="manageChallenge(chalDetails.name, 'purge')"
          >
            <img :src="purge" class="banImg" /><span class="adminBanText"
              >Purge</span
            >
          </button>
        </div>
        <div
          v-if="chalDetails.status === 'Purged'"
          class="changeChallengeStatus"
        >
          <button
            class="adminBanButton"
            @click="manageChallenge(chalDetails.name, 'deploy')"
          >
            <img :src="play" class="banImg" /><span class="adminBanText"
              >Deploy</span
            >
          </button>
        </div>
      </div>
      <div class="aboutChallenge aboutText">
        {{ chalDetails.description }}
      </div>
      <div class="port aboutText">Port : {{ port }}</div>
      <div class="host aboutText">
        {{ `${this.$store.getters.challengeHostUrl}:${this.port}` }}
      </div>
      <button class="adminBanButton testRun">
        <img :src="play" class="banImg" /><span class="adminBanText"
          >Test Run</span
        >
      </button>
    </div>
    <div class="adminChallStatistics">
      <div class="adminHeadingName">Statistics</div>
      <div class="adminChallSubmissions">
        <div class="subheadingName">Submissions</div>
        <div class="info">
          Total {{ this.chalDetails.solvesNumber }} correct submissions are made
        </div>
      </div>
      <div class="adminChallSolves">
        <div class="leftCol">
          <div class="subheadingName">Solve Percentages</div>
          <div class="info">
            There were total <b>{{ this.activeUsers }} Active</b> users, out of
            which,
            <b
              >{{ this.chalDetails.solvesNumber }} ({{
                this.solvePercentage()
              }}%)</b
            >
            are able to solve this challenge.
          </div>
        </div>
        <div class="rightCol">
          <BarGraphVertical
            :chartData="this.barData()"
            :options="this.barChartOptions()"
            class="graph"
            :height="150"
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
  colors
} from "../constants/constants";
import { play, purge, undeploy, edit } from "../constants/images";
import SpinLoader from "../components/spinLoader.vue";
export default {
  components: { BarGraphVertical, AdminTable, SpinLoader },
  name: "AdminChallenge",
  data() {
    return {
      play,
      purge,
      undeploy,
      edit,
      loading: {
        api1: true,
        api2: true,
        api3: true
      },
      tableCols: tableCols.adminChallenge,
      rows: [],
      chalDetails: {},
      confirmDialogs: confimDialogMessages(this.$route.params.id).adminChallenge
    };
  },
  created() {
    if (!this.$store.getters.getState) {
      this.$router.push("/login/");
    }
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
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    barData() {
      return {
        labels: ["Solve Percentage"],
        datasets: [
          {
            backgroundColor: colors.singleBarGraph,
            data: [this.solvePercentage()]
          }
        ]
      };
    },
    barChartOptions() {
      return barChartOptions().challenges;
    },
    solvePercentage() {
      return (this.chalDetails.solvesNumber / this.activeUsers) * 100;
    },
    manageChallenge(name, action) {
      let confirmHandler = confirm => {
        if (confirm) {
          ChalService.manageChalAction(name, action).then(async response => {
            if (response.status !== 200) {
              console.log(response.data);
            } else {
              if (action === "purge") {
                await this.sleep(5000);
                this.$router.push("/admin/challenges");
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
        callback: confirmHandler
      };
      this.$confirm(inputParams);
    }
  },
  mounted() {
    UsersService.getUserStats()
      .then(response => {
        this.activeUsers = response.data.unbanned_users;
      })
      .finally(() => {
        this.loading.api1 = false;
      });
    ChalService.fetchChallengeByName(this.$route.params.id)
      .then(response => {
        let data = response.data;
        this.chalDetails = data;
        if (data.ports !== null) {
          this.chalDetails.port = data.ports[0];
        }
      })
      .finally(() => {
        this.loading.api2 = false;
      });

    SubmissionService.getSubmissions()
      .then(response => {
        response.forEach(element => {
          if (element.name == this.$route.params.id) {
            this.rows.push({
              username: element.username,
              timeDateRight: element.solvedAt
            });
          }
        });
      })
      .finally(() => {
        this.loading.api3 = false;
      });
  }
};
</script>
