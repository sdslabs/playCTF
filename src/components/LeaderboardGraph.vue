<template>
  <div class="lineGraph-container">
    <LineGraph
      :chartData="chartData"
      :options="lineGraphOptions"
      class="lineGraph"
      :height="250"
      v-if="isDataReady"
    />
    <div v-else class="loading-message">
      Loading chart data...
    </div>
  </div>
</template>
<script>
import UsersService from "@/api/admin/usersAPI";
import SubmissionService from "@/api/admin/submissionsAPI";
import LineGraph from "@/components/LineGraph.vue";
import utils from "@/api/utils";
import moment from "moment-timezone";
import {
  tableCols,
  colors,
  lineGraphOptions,
  lineGraphConfig
} from "../constants/constants";
import { leaderboard, search, download } from "../constants/images";
export default {
  components: { LineGraph },
  name: "LeaderboardGraph",
  data() {
    return {
      leaderboard,
      search,
      download,
      loading: true,
      lineColors: colors.lineGraph,
      scoreSeries: [],
      oldScoreSeries: [],
      chartData: null,
      lineGraphOptions: lineGraphOptions(true),
      searchQuery: null,
      tableCols: tableCols.leaderboard,
      users: [],
      displayUsers: [],
      state: {}
    };
  },
  computed: {
    isDataReady() {
      console.log(
        this.users.length > 0,
        this.scoreSeries.length > 0,
        this.chartData !== null
      );
      return (
        this.users.length > 0 &&
        this.scoreSeries.length > 0 &&
        this.chartData !== null
      );
    }
  },
  watch: {
    scoreSeries: {
      handler(newSeries) {
        if (newSeries.length > 0) {
          this.updateChartData();
        }
      },
      deep: true
    }
  },
  methods: {
    updateChartData() {
      let datasets = [];
      let update = false;
      
      if (this.scoreSeries !== this.oldScoreSeries) {
        this.oldScoreSeries = this.scoreSeries;
        update = true;
      }
      
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
      
      console.log("Datasets", datasets);
      this.chartData = {
        label: "Leaderboard",
        datasets,
        update
      };
    },
    findScoreSeries(users) {
      // Get all usernames first
      const usernames = users.map(user => user.username);
      
      // Fetch submissions only once
      SubmissionService.getSubmissions().then(submissions => {
        if (!submissions) return;
        console.log("Submissions", submissions);
        // Group submissions by username
        const userSubmissions = SubmissionService.groupSubmissionsByUsers(submissions, usernames);
        
        // Process submissions for each user
        const scoreSeriesLocal = users.map(user => ({
          username: user.username,
          series: this.findUserScoreSeries(userSubmissions[user.username] || [], user.score)
        }));
        
        this.scoreSeries = scoreSeriesLocal;
        console.log("Score series", scoreSeriesLocal);
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
          this.state.competitionInfo.startingTime,
          "HH:mm:ss UTC: Z, DD MMMM YYYY, dddd"
        ),
        y: 0
      };
      let currentMoment = moment.now();
      let endingMoment = moment(
        this.state.competitionInfo.endingTime,
        "HH:mm:ss UTC: Z, DD MMMM YYYY, dddd"
      );
      let maxX;
      if (currentMoment > endingMoment) {
        maxX = endingMoment;
      } else {
        maxX = currentMoment;
      }
      scoreSeries[data.length + 1] = {
        x: maxX,
        y: score
      };
      return scoreSeries;
    },
    async exportLeaderBoardAsCSV() {
      var jsonObject = JSON.stringify(this.resultQuery);
      var csv = await utils.convertToCSV(jsonObject);
      utils.saveAsFile(csv, "leaderboard.csv", "text/csv");
    }
  },
  mounted() {
    this.state = this.$store.state;
    UsersService.getLeaderboard(1)
      .then(users => {
        console.log("Users", users);
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
  }
};
</script>
