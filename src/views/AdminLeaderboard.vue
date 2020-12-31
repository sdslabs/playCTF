<template>
  <div class="mainAdminContainer">
    <div class="adminHeadingColor">
      <img src="@/assets/leaderboard.svg" class="adminHeadingColor" />
    </div>
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
          <img src="@/assets/search.svg" class="searchImg" />
        </button>
        <input
          v-model="searchQuery"
          placeholder="Search for teams here..."
          class="query"
        />
      </div>
    </div>

    <admin-table
      :tableCols="tableCols"
      :rows="resultQuery"
      :links="[{ col: 'username', redirect: '/admin/users/' }]"
      :maxElementPerPage="10"
      v-if="resultQuery.length > 0"
    />
    <div class="adminEmptyDataContainer" v-else>
      <span class="adminEmptyData">No Users</span>
    </div>
  </div>
</template>
<script>
import adminTable from "../components/adminTable.vue";
import UsersService from "../api/admin/usersAPI";
import SubmissionService from "../api/admin/submissionsAPI";
import LineGraph from "../components/LineGraph.vue";
export default {
  components: { adminTable, LineGraph },
  name: "AdminLeaderboard",
  data() {
    return {
      lineColors: ["#22F80F", "#F80F55", "#0F6CF8"],
      scoreSeries: [],
      lineGraphOptions: {
        layout: {
          padding: 10
        },
        legend: {
          display: true,
          position: "top",
          labels: {
            fontFamily: "Nunito Sans",
            fontColor: "#191919",
            fontSize: 12,
            lineHeight: 12,
            boxWidth: 20
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "#575757",
                drawOnChartArea: false
              },
              scaleLabel: {
                display: true,
                labelString: "Time"
              },
              ticks: {
                source: "auto",
                fontColor: "#393939",
                fontFamily: "Roboto",
                fontStyle: "normal"
              },
              type: "time",
              distribution: "linear",
              time: {
                unit: "hour"
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Score"
              },
              gridLines: {
                color: "#575757",
                drawOnChartArea: false
              },
              ticks: {
                source: "auto",
                fontColor: "#393939",
                fontFamily: "Roboto",
                fontStyle: "normal",
                min: 0
              }
            }
          ]
        }
      },
      searchQuery: "",
      ascending: false,
      sortColumn: "",
      tableCols: [
        {
          id: 1,
          label: "Rank",
          style: {
            textAlign: "center",
            width: "10%"
          }
        },
        {
          id: 2,
          label: "User Name",
          style: {
            width: "75%",
            paddingLeft: "40px",
            textAlign: "left"
          }
        },
        {
          id: 3,
          label: "Score",
          style: {
            textAlign: "center",
            width: "15%"
          }
        }
      ],
      users: [],
      displayUsers: []
    };
  },
  methods: {
    lineGraphData() {
      var datasets = [];
      this.scoreSeries.forEach((el, index) => {
        var labelPostText;
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
          backgroundColor: this.lineColors[index],
          borderColor: this.lineColors[index],
          label: `${this.scoreSeries[index].username} ${labelPostText}`,
          lineTension: 0,
          pointRadius: 5,
          borderWidth: 1,
          fill: false,
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
      var scoreSeries = [];
      var timeScores = [];
      data.forEach((el, index) => {
        if (index === 0) {
          timeScores[0] = score;
        } else {
          var currentScore = score;
          data.slice(0, index).forEach(sub => {
            currentScore -= sub.points;
          });
          timeScores[index] = currentScore;
        }
        scoreSeries[index] = {
          x: new Date(el.solvedAt),
          y: timeScores[index]
        };
      });
      return scoreSeries;
    },
    changePage() {
      this.currentPage = this.jumpPage;
    },
    num_pages: function num_pages() {
      return Math.ceil(this.rows.length / this.elementsPerPage);
    },
    get_rows: function get_rows() {
      var start = (this.currentPage - 1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.rows.slice(start, end);
    },
    change_page: function change_page(page) {
      this.currentPage = page;
    },
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
    }
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    },
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
    UsersService.getUsers().then(users => {
      if (users === null) {
        console.log("error fetching users");
        return;
      }
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
      var leaders;
      if (this.displayUsers.length > 3) {
        leaders = this.displayUsers.slice(0, 3);
      } else {
        leaders = this.displayUsers;
      }
      this.findScoreSeries(leaders);
    });
  }
};
</script>
