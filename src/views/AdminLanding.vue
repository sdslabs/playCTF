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
              (challenges.maxSolvedChal.solves / users.total_registered_users) *
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
              (challenges.leastSolvedChal.solves /
                users.total_registered_users) *
              100
            }}</span
          >%).
        </p>
      </div>
    </div>

    <div class="adminStatsContainer">
      <div class="adminTwoColContainer">
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
            :height="200"
            :width="200"
          />
        </div>
      </div>
    </div>
    <div class="adminStatsContainer">
      <div class="adminOneColContainer">
        <p class="adminSubheading">
          Solve Percentages (Out of {{ users.active }} Active Users)
        </p>
        <div class="adminSolveGraphContainer">
          <div v-for="tag in chalTags" :key="tag.id" class="graph">
            <div class="graphTitle">{{ tag.name }}</div>
            <BarGraph
              v-bind:chartData="getBarData(tag.name)"
              v-bind:options="barChartOptions"
            />
          </div>
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
      if(dataSolves.length>5){
        dataSolves = dataSolves.slice(0,5);
      }
      var labels = [];
      var data = [];
      dataSolves.forEach(el=>{
        labels.push(el.username)
        console.log("Aviral")
        console.log(el)
        console.log(this.chalCategory[tag])
        data.push(el.solves/this.chalCategory[tag].total*100);
      })
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
      this.leader = users.sort((a, b) => {
        return a.rank > b.rank ? 1 : -1;
      })[0];
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
      leader: {},
      submissions: {},
      chalCategory: {},
      attempts: {
        labels: [
          {
            name: "Misc",
            id: 1,
            Total: 300,
            Correct: 100,
            Incorrect: 200,
            topUsers: [
              { name: "a", percentage: "20%" },
              { name: "b", percentage: "30%" },
              { name: "c", percentage: "20%" },
              { name: "d", percentage: "30%" },
              { name: "e", percentage: "20%" },
            ],
          },
          {
            name: "PWN",
            id: 2,
            Total: 300,
            Correct: 60,
            Incorrect: 140,
            topUsers: [
              { name: "a", percentage: "20%" },
              { name: "b", percentage: "30%" },
              { name: "c", percentage: "20%" },
              { name: "d", percentage: "30%" },
              { name: "e", percentage: "20%" },
            ],
          },
          {
            name: "Web",
            id: 3,
            Total: 300,
            Correct: 60,
            Incorrect: 140,
            topUsers: [
              { name: "a", percentage: "20%" },
              { name: "b", percentage: "30%" },
              { name: "c", percentage: "20%" },
              { name: "d", percentage: "30%" },
              { name: "e", percentage: "20%" },
            ],
          },
          {
            name: "Crypto",
            id: 4,
            Total: 300,
            Correct: 30,
            Incorrect: 170,
            topUsers: [
              { name: "a", percentage: "20%" },
              { name: "b", percentage: "30%" },
              { name: "c", percentage: "20%" },
              { name: "d", percentage: "30%" },
              { name: "e", percentage: "20%" },
            ],
          },
        ],
        Total: {
          total: 1200,
          data: [300, 300, 300, 300],
        },
      },
      categoryFilter: "Correct",
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: "right",
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
                display: false,
              },
              ticks: {
                stepSize: 20,
                min: 0,
                max: 100,
              },
            },
          ],
        },
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      barData: {
        labels: ["a", "b", "c", "d", "e"],
        datasets: [
          {
            backgroundColor: [
              "#55C39C",
              "#6269AB",
              "#59ABDA",
              "#81C1D6",
              "#6E8A8E",
            ],
            data: [40, 40, 40, 50, 60],
          },
        ],
      },
      attemptsChartData: {
        hoverBorderWidth: 10,
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651"],
            data: [250, 950],
          },
        ],
      },
    };
  },
};
</script>
