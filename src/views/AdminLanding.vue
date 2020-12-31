<template>
  <div class="mainAdminContainer">
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
            >{{ challenges.maxSolvedChal.solves }} ({{
              challenges.maxSolvedChal.solves === "-"
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
            >{{ challenges.leastSolvedChal.solves }} ({{
              challenges.leastSolvedChal.solves === "-"
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
      <div
        class="adminEmptyDataContainer"
        :style="{ alignSelf: 'flex-start' }"
        v-else
      >
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
        <div
          class="adminEmptyDataContainer"
          :style="{ alignSelf: 'flex-start' }"
          v-else
        >
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
export default {
  name: "Admin",
  components: {
    PieChart,
    BarGraph,
  },
  methods: {
    getBarData(tag) {
      var dataSolves = this.chalCategory[tag].solves;
      if (dataSolves.length > 5) {
        dataSolves = dataSolves.slice(0, 5);
      }
      var labels = [];
      var data = [];
      dataSolves.forEach((el) => {
        labels.push(el.username);
        console.log("Aviral");
        console.log(el);
        console.log(this.chalCategory[tag]);
        data.push((el.solves / this.chalCategory[tag].total) * 100);
      });
      console.log(data);
      return {
        labels,
        datasets: [
          {
            backgroundColor: [
              "#55C39C",
              "#6269AB",
              "#59ABDA",
              "#81C1D6",
              "#6E8A8E",
            ],
            data,
          },
        ],
      };
    },
    changeFilter(value) {
      this.categoryFilter = value;
      this.categoryChartData = {
        hoverBorderWidth: 10,
        labels: ["Misc", "PWN", "Web", "Crypto"],
        datasets: [
          {
            backgroundColor: ["#B12BD2", "#FEC42C", "#5793F3", "#EA9311"],
            data: this.attempts[value].data,
          },
        ],
      };
    },
    categoryChartData() {
      var labels = [];
      var data = [];
      this.chalTags.forEach((el) => {
        labels.push(el.name);
      });
      labels.forEach((el) => {
        data.push(this.submissions.category[el]);
      });
      return {
        hoverBorderWidth: 10,
        labels,
        datasets: [
          {
            backgroundColor: ["#B12BD2", "#FEC42C", "#5793F3", "#EA9311"],
            data,
          },
        ],
      };
    },
  },
  mounted() {
    UsersService.getUserStats().then((response) => {
      if (response.status !== 200) {
        console.log(response);
      } else {
        this.users = response.data;
      }
    });

    UsersService.getUsers().then((users) => {
      if (users === null) {
        console.log("error fetching users");
        return;
      }
      if (users.length > 0) {
        this.leader = users.sort((a, b) => {
          return a.rank > b.rank ? 1 : -1;
        })[0];
      }
    });
    ChalService.getChalStats().then((response) => {
      if (response === null) {
        console.log("Error fetching chal stats");
        return;
      } else {
        this.challenges = response;
      }
    });
    ChalService.getChallenges().then((response) => {
      if (response === null) {
        console.log("Error fetching challenges");
        return;
      } else {
        this.chalTags = response.categoryFilterOptions;
        SubmissionService.getSubStats(this.chalTags, null).then((response) => {
          if (response === null) {
            console.log("error fetching submission stats");
          } else {
            this.submissions = response;
            console.log(this.submissions);
          }
        });
        ChalService.getChalCategory(this.chalTags).then((response) => {
          if (response === null) {
            console.log("Error fetching challenge category data");
            return;
          } else {
            this.chalCategory = response;
          }
        });
      }
    });
  },
  data() {
    return {
      users: {},
      challenges: {},
      leader: {
        username:"-",
        score:"-"
      },
      submissions: {},
      chalCategory: {},
      categoryFilter: "Correct",
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: "right",
          labels: {
            boxWidth: 20,
          },
        },
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "#575757",
                drawOnChartArea: false,
              },
              ticks: {
                stepSize: 20,
                min: 0,
                max: 100,
                fontColor: "#393939",
                fontFamily: "Roboto",
                fontStyle: "normal",
              },
              scaleLabel: {
                display: true,
                labelString: "Solve %",
              },
            },
          ],
        },
        yAxes: [
          {
            gridLines: {
              color: "#575757",
              drawOnChartArea: false,
            },
          },
        ],
      },
    };
  },
};
</script>
