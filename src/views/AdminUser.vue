<template>
  <spin-loader v-if="isLoading" />
  <div class="mainAdminContainer" v-else>
    <vue-confirm-dialog class="manageChalConfirmBox"></vue-confirm-dialog>
    <div class="adminUserInfoContainer">
      <div class="user">
        <div class="userDetails">
          <div class="userName">
            <div class="name">{{ userDetails.name }}</div>
            <a :href="`mailto:${userDetails.email}`" class="mailLink">
              <img :src="mail" class="mailImg" />
              <div class="contact">Contact</div></a
            >
          </div>
          <div class="rankScore">
            <div class="rank">
              <span
                class="value"
                :style="
                  this.userDetails.active
                    ? { color: '$theme-color-black19' }
                    : { color: 'rgba(25, 25, 25, 0.57)' }
                "
                >{{ userDetails.rank }}</span
              >
              <span class="field">Rank</span>
            </div>
            <div class="score">
              <span
                class="value"
                :style="
                  this.userDetails.active
                    ? { color: '$theme-color-black19' }
                    : { color: 'rgba(25, 25, 25, 0.57)' }
                "
                >{{ userDetails.score }}</span
              >
              <span class="field">Score</span>
            </div>
          </div>
        </div>
        <div v-if="getAccess()">
          <div class="userStatus" v-if="userDetails.active">
            <div class="status unbanned">Active</div>
            <button
              class="action-cta"
              @click="manageUser(userDetails.id, 'ban')"
            >
              <img :src="ban" />
              <div class="adminBanText">Ban Player</div>
            </button>
          </div>
          <div class="userStatus" v-else>
            <div class="status banned">Banned</div>
            <button
              class="action-cta"
              @click="manageUser(userDetails.id, 'unban')"
            >
              <img :src="unban" />
              <div class="adminBanText">Remove Ban</div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="adminStatsContainer">
      <p class="adminSubheading">Submissions</p>
      <div class="adminTwoColContainer" v-if="this.submissions.totalChal > 0">
        <div class="adminStatsLeftCol">
          <div class="adminOneColContainer">
            <p class="adminInfo">
              Total
              <span class="adminBold">{{ this.submissions.totalChal }}</span>
              correct submisions are made
            </p>
            <p class="adminInfo" v-for="cat in chalTags" :key="cat.id">
              <span class="adminBold">{{ cat.name }}</span> has
              <span class="adminBold">{{
                submissions.category[cat.name]
              }}</span>
              correct submissions.
            </p>
          </div>
        </div>
        <div class="adminStatsRightCol">
          <PieChart
            v-bind:chartData="this.categoryChartData()"
            v-bind:options="this.chartOptions"
            :height="130"
            :width="250"
          />
        </div>
      </div>
      <div class="adminEmptyDataContainer" v-else>
        <span class="adminEmptyData">No Correct Submissions</span>
      </div>
    </div>
    <div class="adminStatsContainer">
      <div class="adminOneColContainer">
        <p class="adminSubheading">Score over time</p>
        <LineGraph
          v-if="userDetails.active && this.rows.length > 0"
          :chartData="this.lineGraphData()"
          :options="this.lineGraphOptions"
          class="lineGraph"
          :height="150"
        />
        <div class="adminEmptyDataContainer" v-else-if="!userDetails.active">
          <span class="adminEmptyData">Banned</span>
        </div>
        <div class="adminEmptyDataContainer" v-else>
          <span class="adminEmptyData">No Points Scored</span>
        </div>
      </div>
    </div>
    <hr class="hrSeparator" />
    <div class="adminHeadingName">Submissions</div>
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[{ col: 'challenge', redirect: '/admin/challenges/' }]"
      :maxElementPerPage="10"
      v-if="rows.length > 0"
    />
    <div class="adminEmptyDataContainer" v-else>
      <span class="adminEmptyData">No Correct Submissions</span>
    </div>
  </div>
</template>
<script>
import LineGraph from "../components/LineGraph.vue";
import adminTable from "../components/adminTable";
import ChalService from "../api/admin/challengesAPI";
import SubmissionService from "../api/admin/submissionsAPI";
import PieChart from "../components/PieChart.vue";
import UsersService from "../api/admin/usersAPI";
import SpinLoader from "../components/spinLoader";
import store from "../store/index";
import moment from "moment";
import {
  confimDialogMessages,
  tableCols,
  pieChartOptions,
  lineGraphOptions,
  lineGraphConfig,
  colors
} from "../constants/constants";
import { mail, ban, unban } from "../constants/images";
export default {
  name: "AdminUser",
  components: {
    LineGraph,
    adminTable,
    PieChart,
    SpinLoader
  },
  data() {
    return {
      mail,
      ban,
      unban,
      loading: {
        challengesNotFetched: true,
        userNotFetched: true
      },
      confirmDialogs: confimDialogMessages().user,
      scoreSeries: {},
      lineGraphOptions: lineGraphOptions(false),
      submissions: {},
      chartOptions: pieChartOptions(),
      userDetails: {
        name: "",
        rank: "",
        score: "",
        active: true,
        id: null
      },
      rows: [],
      tableCols: tableCols.user
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
  methods: {
    getAccess() {
      if (store.getters.getRole === "admin") return true;
      return false;
    },
    manageUser(userId, action) {
      let confirmHandler = confirm => {
        if (confirm) {
          UsersService.manageUser(userId, action).then(() => {
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
    findScoreSeries(data) {
      data = data.sort((a, b) => {
        return new Date(a.solvedAt) < new Date(b.solvedAt) ? 1 : -1;
      });
      let scoreSeries = [];
      let timeScores = [];
      data.forEach((el, index) => {
        if (index === 0) {
          timeScores[0] = this.userDetails.score;
        } else {
          let currentScore = this.userDetails.score;
          data.slice(0, index).forEach(sub => {
            currentScore -= sub.points;
          });
          timeScores[index] = currentScore;
        }
        scoreSeries[index + 1] = {
          x: moment(new Date(el.solvedAt)),
          y: timeScores[index]
        };
      });
      scoreSeries[0] = {
        x: moment(
          this.$store.state.competitionInfo.startingTime,
          "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
        ),
        y: 0
      };
      return scoreSeries;
    },
    lineGraphData() {
      return {
        datasets: [
          {
            ...lineGraphConfig.singleLineConfig,
            ...lineGraphConfig,
            data: this.scoreSeries
          }
        ]
      };
    },
    categoryChartData() {
      let labels = [];
      let data = [];
      this.chalTags.forEach(el => {
        labels.push(el.name);
      });
      labels.forEach(el => {
        data.push(this.submissions.category[el]);
      });
      return {
        labels,
        datasets: [
          {
            backgroundColor: colors.pieChart,
            data
          }
        ]
      };
    }
  },
  mounted() {
    ChalService.getChallenges()
      .then(response => {
        this.chalTags = response.categoryFilterOptions;
        SubmissionService.getSubStats(
          this.chalTags,
          this.$route.params.username
        ).then(response => {
          this.submissions = response;
        });
      })
      .finally(() => {
        this.loading.challengesNotFetched = false;
      });
    UsersService.getUserByUsername(this.$route.params.username)
      .then(response => {
        let data = response.data;
        this.userDetails.id = data.id;
        this.userDetails.name = data.username;
        this.userDetails.score = data.score;
        this.userDetails.rank = data.rank;
        this.userDetails.active = data.status === 0;
        this.userDetails.email = data.email;
        SubmissionService.getUserSubs(this.$route.params.username).then(
          subData => {
            subData.forEach(element => {
              this.rows.push({
                challenge: element.name,
                category: element.category,
                timeDateRight: element.solvedTime
              });
            });
            this.scoreSeries = this.findScoreSeries(subData);
          }
        );
      })
      .finally(() => {
        this.loading.userNotFetched = false;
      });
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminUsers");
  }
};
</script>
