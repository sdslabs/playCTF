<template>
  <spin-loader v-if="isLoading" />
  <div class="mainAdminContainer" v-else>
    <div class="adminHeadingName">Statistics</div>
    <div class="adminStatsContainer">
      <div class="adminOneColContainer">
        <p class="adminSubheading">General</p>
        <p class="adminInfo">
          Total
          <span class="adminBold">{{ userStats.total_registered_users }}</span>
          are registered out of which
          <span class="adminBold">{{ userStats.banned_users }}</span> are banned
          and,
        </p>
        <p class="adminInfo">
          <span class="adminBold">{{ challenges.deployedChal }}</span> are
          deployed,
          <span class="adminBold">{{ challenges.undeployedChal }}</span> are
          undeployed and
          <span class="adminBold">{{ challenges.purgedChal }}</span> are purged
        </p>
        <p class="adminInfo">
          <span class="adminVioletBold">{{ leader.username }}</span> leads the
          leaderboard with
          <span class="adminBold">{{ leader.score }}</span> points.
        </p>
        <p class="adminInfo">
          <span class="adminVioletBold">{{
            challenges.maxSolvedChal.name
          }}</span>
          is the most solved challenge with
          <span class="adminBold"
            >{{
              challenges.maxSolvedChal.solves === -1
                ? "-"
                : challenges.maxSolvedChal.solves
            }}
            ({{
              challenges.maxSolvedChal.solves === -1
                ? "-"
                : (
                    (challenges.maxSolvedChal.solves /
                      userStats.total_registered_users) *
                    100
                  ).toFixed(2)
            }}</span
          >%) solves, whereas,
        </p>
        <p class="adminInfo">
          <span class="adminVioletBold">{{
            challenges.leastSolvedChal.name
          }}</span>
          is the least solved challenge with
          <span class="adminBold"
            >{{
              challenges.leastSolvedChal.solves === -1
                ? "-"
                : challenges.leastSolvedChal.solves
            }}
            ({{
              challenges.leastSolvedChal.solves === -1
                ? "-"
                : (
                    (challenges.leastSolvedChal.solves /
                      userStats.total_registered_users) *
                    100
                  ).toFixed(2)
            }}</span
          >%).
        </p>
      </div>
    </div>

    <div class="adminStatsContainer">
      <div class="adminTwoColContainer" v-if="this.submissions.totalChal > 0">
        <div class="adminStatsLeftCol">
          <p class="adminSubheading">Submissions</p>
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
            v-bind:options="this.pieChartOptions"
            :height="200"
            :width="250"
          />
        </div>
      </div>
      <div class="adminEmptyDataContainer" v-else>
        <span class="adminEmptyData">No Submissions</span>
      </div>
    </div>
    <div class="adminStatsContainer">
      <div class="adminOneColContainer">
        <p class="adminSubheading">
          Solve Percentages (Out of {{ userStats.active }} Active Users)
        </p>
        <div class="adminSolveGraphContainer" v-if="this.chalTags.length > 0">
          <div v-for="tag in chalTags" :key="tag.id" class="graph">
            <div class="graphTitle">{{ tag.name }}</div>
            <BarGraph
              v-bind:chartData="getBarData(tag.name)"
              v-bind:options="barChartOptions"
            />
          </div>
        </div>
        <div class="adminEmptyDataContainer" v-else>
          <span class="adminEmptyData">No Challenges Category Available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../components/PieChart.vue";
import BarGraph from "../components/BarGraph.vue";
import UsersService from "../api/admin/usersAPI";
import ChalService from "../api/admin/challengesAPI";
import SpinLoader from "../components/spinLoader.vue";
import {
  getChalStats,
  getChallenges,
  getChalCategory
} from "../utils/challenges";
import { getSubStats } from "../utils/submissions";
import {
  colors,
  barChartOptions,
  pieChartOptions
} from "../constants/constants";
export default {
  name: "AdminStatistics",
  components: {
    PieChart,
    BarGraph,
    SpinLoader
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
    getBarData(tag) {
      console.log(this.chalCategory);
      let dataSolves = this.chalCategory[tag].solves;
      if (dataSolves.length > 5) {
        dataSolves = dataSolves.slice(0, 5);
      }
      let labels = [];
      let data = [];
      dataSolves.forEach(el => {
        labels.push(el.username);
        data.push(((el.solves / this.chalCategory[tag].total) * 100).toFixed(0));
      });
      return {
        labels,
        datasets: [
          {
            backgroundColor: colors.barGraph,
            data
          }
        ]
      };
    },
    categoryChartData() {
      let labels = [];
      let data = [];
      this.chalTags.forEach(tag => {
        labels.push(tag.name);
      });
      labels.forEach(label => {
        let sub = this.submissions.category[label];
        data.push(sub);
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
  async mounted() {
    this.userStats = await (await UsersService.getUserStats()).data;
    this.loading.userStatsNotFetched = false;
    let allUsers = await UsersService.getUsers();
    if (allUsers.length > 0) {
      this.leader = allUsers.sort((a, b) => {
        return a.rank - b.rank;
      })[0];
    }
    this.loading.usersNotFetched = false;
    this.challenges = await getChalStats();
    this.loading.chalStatsNotFetched = false;
    let chalData = await getChallenges();
    this.chalTags = chalData.tagFilterOptions;
    this.submissions = await getSubStats(this.chalTags, null);
    this.chalCategory = await getChalCategory(this.chalTags);
    this.loading.challengesNotFetched = false;
  },
  data() {
    return {
      loading: {
        userStatsNotFetched: true,
        usersNotFetched: true,
        chalStatsNotFetched: true,
        challengesNotFetched: true
      },
      userStats: {},
      challenges: {},
      leader: {
        username: "-",
        score: "-"
      },
      submissions: {},
      chalCategory: {},
      pieChartOptions: pieChartOptions(),
      barChartOptions: barChartOptions().statistics
    };
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminStatistics");
  }
};
</script>
