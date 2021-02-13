<template>
  <spin-loader v-if="isLoading" />
  <div class="mainAdminContainer" v-else>
    <div class="adminHeadingName">Statistics</div>
    <div class="adminStatsContainer">
      <div class="adminOneColContainer">
        <p class="adminSubheading">General</p>
        <p class="adminInfo">
          Total
          <span class="adminBold">{{ users.total_registered_users }}</span> are
          registered out of which
          <span class="adminBold">{{ users.banned_users }}</span> are banned
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
                : (challenges.maxSolvedChal.solves /
                    users.total_registered_users) *
                  100
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
                : (challenges.leastSolvedChal.solves /
                    users.total_registered_users) *
                  100
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
            v-bind:options="this.chartOptions"
            :height="130"
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
          Solve Percentages (Out of {{ users.active }} Active Users)
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
import SubmissionService from "../api/admin/submissionsAPI";
import SpinLoader from "../components/spinLoader.vue";
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
      let dataSolves = this.chalCategory[tag].solves;
      if (dataSolves.length > 5) {
        dataSolves = dataSolves.slice(0, 5);
      }
      let labels = [];
      let data = [];
      dataSolves.forEach(el => {
        labels.push(el.username);
        data.push((el.solves / this.chalCategory[tag].total) * 100);
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
      this.chalTags.forEach(el => {
        labels.push(el.name);
      });
      labels.forEach(el => {
        let sub = this.submissions.category[el];
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
  mounted() {
    UsersService.getUserStats()
      .then(response => {
        this.users = response.data;
      })
      .finally(() => {
        this.loading.userStatsNotFetched = false;
      });

    UsersService.getUsers()
      .then(users => {
        if (users.length > 0) {
          this.leader = users.sort((a, b) => {
            return a.rank - b.rank;
          })[0];
        }
      })
      .finally(() => {
        this.loading.usersNotFetched = false;
      });

    ChalService.getChalStats()
      .then(response => {
        this.challenges = response;
      })
      .finally(() => {
        this.loading.chalStatsNotFetched = false;
      });

    ChalService.getChallenges()
      .then(response => {
        this.chalTags = response.categoryFilterOptions;
        SubmissionService.getSubStats(this.chalTags, null).then(response => {
          this.submissions = response;
        });
        ChalService.getChalCategory(this.chalTags).then(response => {
          this.chalCategory = response;
        });
      })
      .finally(() => {
        this.loading.challengesNotFetched = false;
      });
  },
  data() {
    return {
      loading: {
        userStatsNotFetched: true,
        usersNotFetched: true,
        chalStatsNotFetched: true,
        challengesNotFetched: true
      },
      users: {},
      challenges: {},
      leader: {
        username: "-",
        score: "-"
      },
      submissions: {},
      chalCategory: {},
      chartOptions: pieChartOptions(),
      barChartOptions: barChartOptions().statistics
    };
  }
};
</script>
