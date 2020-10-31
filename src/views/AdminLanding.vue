<template>
  <div class="admin">
    <div class="heading">
      Statistics
    </div>
    <div class="container">
      <div class="general">
        <div class="content">
          <p class="subheading">General</p>
          <p>
            Total <span class="bold">{{ users.total }}</span> are registered out
            of which <span class="bold">{{ users.banned }}</span> are banned
            and,
          </p>
          <p>
            <span class="bold">{{ challenges.total }}</span> are deployed,
            <span class="bold">{{ challenges.deployed }}</span> are deployed and
            <span class="bold">{{ challenges.purged }}</span> are purged
          </p>
          <p>
            <span class="name">{{ leader.name }}</span> leads the leaderboard
            with <span class="bold">{{ leader.points }}</span> points.
          </p>
          <p>
            <span class="name">{{ mostSolvedChallenge.name }}</span> is the most
            solved challenge with
            <span class="bold"
              >{{ mostSolvedChallenge.solves }} ({{
                mostSolvedChallenge.percentage
              }}</span
            >%) solves, whereas,
          </p>
          <p>
            <span class="name">{{ leastSolveChallenge.name }}</span> is the
            least solved challenge with
            <span class="bold"
              >{{ leastSolveChallenge.solves }} ({{
                mostSolvedChallenge.percentage
              }}</span
            >%).
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="attempts">
        <div class="content">
          <p class="subheading">Attempts History</p>
          <p>
            Total
            <span class="bold">{{ attempts.Total.total }}</span> Submisions are
            made
          </p>
          <p>
            Out of which,
            <span class="bold"
              >{{ attempts.Correct.total }}({{
                attempts.Correct.percentage
              }}%)</span
            >
            are correct
          </p>
          <p>
            and,
            <span class="bold"
              >{{ attempts.Incorrect.total }}({{
                attempts.Incorrect.percentage
              }}%)</span
            >
            are correct
          </p>
        </div>
        <div class="graph">
          <PieChart
            :chartData="attemptsChartData"
            :options="chartOptions"
            :height="200"
            :width="200"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="category">
        <div class="content">
          <p class="subheading">Category Breakdown</p>
          <v-select
            class="dropdown"
            :options="['Total', 'Correct', 'Incorrect']"
            :value="this.categoryFilter"
            @input="changeFilter"
            :clearable="false"
          />
          <p v-for="cat in attempts.labels" :key="cat.id">
            <span class="bold">{{ cat.name }}</span> has
            <span class="bold">{{ cat[categoryFilter] }}</span>
            {{ categoryFilter }} submissions.
          </p>
        </div>
        <div class="graph">
          <PieChart
            v-bind:chartData="this.categoryChartData"
            v-bind:options="this.chartOptions"
            :height="200"
            :width="200"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="category">
        <div class="content">
          <p class="subheading">
            Solve Percentages (Out of {{ users.active }} Active Users)
          </p>
        </div>
        <div class="graph">
          <BarGraph
            v-bind:chartData="this.barData"
            v-bind:options="this.barChartOptions"
            :height="200"
            :width="200"
          />
        </div>
        <div class="graph">
          <BarGraph
            v-bind:chartData="this.barData"
            v-bind:options="this.barChartOptions"
            :height="200"
            :width="200"
          />
        </div>
        <div class="graph">
          <BarGraph
            v-bind:chartData="this.barData"
            v-bind:options="this.barChartOptions"
            :height="200"
            :width="200"
          />
        </div>
        <div class="graph">
          <BarGraph
            v-bind:chartData="this.barData"
            v-bind:options="this.barChartOptions"
            :height="200"
            :width="200"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../components/PieChart";
import BarGraph from "../components/BarGraph";
export default {
  name: "Admin",
  components: {
    PieChart,
    BarGraph
  },
  methods: {
    changeFilter(value) {
      this.categoryFilter = value;
      this.categoryChartData = {
        hoverBorderWidth: 10,
        labels: ["Misc", "PWN", "Web", "Crypto"],
        datasets: [
          {
            backgroundColor: ["#B12BD2", "#FEC42C", "#5793F3", "#EA9311"],
            data: this.attempts[value].data
          }
        ]
      };
    }
  },
  data() {
    return {
      users: {
        total: 125,
        banned: 7,
        active: 118
      },
      challenges: {
        total: 20,
        deployed: 5,
        purged: 5
      },
      leader: {
        name: "Rockstar",
        points: 504
      },
      mostSolvedChallenge: {
        name: "Can You do it",
        solves: 40,
        percentage: 32
      },
      leastSolveChallenge: {
        name: "It's tough",
        solves: 10,
        percentage: 8
      },
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
              { name: "e", percentage: "20%" }
            ]
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
              { name: "e", percentage: "20%" }
            ]
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
              { name: "e", percentage: "20%" }
            ]
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
              { name: "e", percentage: "20%" }
            ]
          }
        ],
        Total: {
          total: 1200,
          data: [300, 300, 300, 300]
        },
        Correct: {
          percentage: 16.66,
          total: 250,
          data: [100, 60, 60, 30]
        },
        Incorrect: {
          total: 950,
          percentage: 83.94,
          data: [200, 140, 140, 170]
        }
      },
      categoryFilter: "Correct",
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: "right"
        }
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                stepSize: 20,
                min: 0,
                max: 100
              }
            }
          ]
        },
        yAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
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
              "#6E8A8E"
            ],
            data: [40, 40, 40, 50, 60]
          }
        ]
      },
      attemptsChartData: {
        hoverBorderWidth: 10,
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651"],
            data: [250, 950]
          }
        ]
      },
      categoryChartData: {
        hoverBorderWidth: 10,
        labels: ["Misc", "PWN", "Web", "Crypto"],
        datasets: [
          {
            backgroundColor: ["#B12BD2", "#FEC42C", "#5793F3", "#EA9311"],
            data: [100, 60, 60, 30]
          }
        ]
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/statistics.scss";
</style>
