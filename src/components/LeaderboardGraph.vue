<template>
  <LineGraph
    :chartData="this.lineGraphData()"
    :options="this.lineGraphOptions"
    class="lineGraph"
    :height="150"
    v-if="this.users.length > 0 && this.scoreSeries.length > 0"
  />
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
      lineGraphOptions: lineGraphOptions(true),
      searchQuery: null,
      tableCols: tableCols.leaderboard,
      users: [],
      displayUsers: [],
      state: {}
    };
  },
  methods: {
    lineGraphData() {
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
      return {
        label: "Leaderboard",
        datasets,
        update
      };
    },
    findScoreSeries(users) {
      let scoreSeriesLocal = [];
      users.forEach(user => {
        SubmissionService.getUserSubs(user.username).then(data => {
          if (data === null || data === undefined) {
            return;
          }
          scoreSeriesLocal.push({
            username: user.username,
            series: this.findUserScoreSeries(data, user.score)
          });
          if (scoreSeriesLocal.length == users.length) {
            this.scoreSeries = scoreSeriesLocal;
          }
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
  }
};
</script>
