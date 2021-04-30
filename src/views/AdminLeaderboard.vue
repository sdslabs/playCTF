<template>
  <div class="mainAdminContainer">
    <div class="adminHeadingColor">
      <img :src="leaderboard" class="adminHeadingColor" />
    </div>
    <spin-loader v-if="loading" />
    <div v-else>
      <LineGraph
        :chartData="this.lineGraphData()"
        :options="this.lineGraphOptions"
        class="lineGraph"
        :height="150"
        v-if="this.users.length > 0 && this.scoreSeries.length > 0"
      />
      <div class="adminLbSearchDiv">
        <div class="adminSearchBar">
          <button class="searchBtn">
            <img :src="search" class="searchImg" />
          </button>
          <input
            v-model="searchQuery"
            placeholder="Search for teams here..."
            class="query"
          />
        </div>
      </div>

      <admin-table
        v-if="resultQuery.length > 0"
        :tableCols="tableCols"
        :rows="resultQuery"
        :links="[{ col: 'username', redirect: '/admin/users/' }]"
        :maxElementPerPage="10"
      />
      <div class="adminEmptyDataContainer" v-else>
        <span class="adminEmptyData">No Users</span>
      </div>
    </div>
  </div>
</template>
<script>
import adminTable from "../components/adminTable.vue";
import UsersService from "../api/admin/usersAPI";
import SubmissionService from "../api/admin/submissionsAPI";
import LineGraph from "../components/LineGraph.vue";
import SpinLoader from "../components/spinLoader.vue";
import moment from "moment-timezone";
import {
  tableCols,
  colors,
  lineGraphOptions,
  lineGraphConfig
} from "../constants/constants";
import { leaderboard, search } from "../constants/images";
export default {
  components: { adminTable, LineGraph, SpinLoader },
  name: "AdminLeaderboard",
  data() {
    return {
      leaderboard,
      search,
      loading: true,
      lineColors: colors.lineGraph,
      scoreSeries: [],
      lineGraphOptions: lineGraphOptions(true),
      searchQuery: "",
      tableCols: tableCols.leaderboard,
      users: [],
      displayUsers: []
    };
  },
  methods: {
    lineGraphData() {
      let datasets = [];
      this.scoreSeries.forEach((el, index) => {
        let labelPostText;
        switch (index) {
          case 0:
            labelPostText = "(1st)";
            break;
          case 1:
            labelPostText = "(2nd)";
            break;
          case 2:
            labelPostText = "(3rd)";
            break;
        }
        datasets.push({
          ...lineGraphConfig,
          backgroundColor: "#ffffff",
          borderColor: this.lineColors[index],
          label: `${this.scoreSeries[index].username} ${labelPostText}`,

          data: this.scoreSeries[index].series
        });
      });
      return {
        label: "Leaderboard",
        datasets
      };
    },
    findScoreSeries(users) {
      users.forEach(user => {
        SubmissionService.getUserSubs(user.username).then(data => {
          if (data === null || data === undefined) {
            return;
          }
          this.scoreSeries.push({
            username: user.username,
            series: this.findUserScoreSeries(data, user.score)
          });
        });
      });
    },
    findUserScoreSeries(data, score) {
      data = data.sort((a, b) => {
        return new Date(a.solvedAt) < new Date(b.solvedAt) ? 1 : -1;
      });
      let scoreSeries = [];
      let timeScores = [];
      data.forEach((el, index) => {
        if (index === 0) {
          timeScores[0] = score;
        } else {
          let currentScore = score;
          data.slice(0, index).forEach(sub => {
            currentScore -= sub.points;
          });
          timeScores[index] = currentScore;
        }
        scoreSeries[data.length - index] = {
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
      scoreSeries[data.length + 1] = {
        x: moment(moment.now(), "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"),
        y: score
      };
      return scoreSeries;
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.displayUsers.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.username.toLowerCase().includes(v));
        });
      } else {
        return this.displayUsers;
      }
    }
  },
  mounted() {
    UsersService.getUsers()
      .then(users => {
        if (users.length === 0) {
          return;
        }
        users.forEach(element => {
          this.users.push({
            rank: element.rank,
            username: element.username,
            score: element.score
          });
        });
        this.displayUsers = this.users.sort((a, b) => {
          return a.rank > b.rank ? 1 : -1;
        });
        let leaders;
        if (this.displayUsers.length > 3) {
          leaders = this.displayUsers.slice(0, 3);
        } else {
          leaders = this.displayUsers;
        }
        this.findScoreSeries(leaders);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminLeaderboard");
  }
};
</script>
