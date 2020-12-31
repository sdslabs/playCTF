<template>
  <div class="mainAdminContainer">
    <vue-confirm-dialog class="manageChalConfirmBox"></vue-confirm-dialog>
    <div class="adminUserInfoContainer">
      <div class="user">
        <div class="userDetails">
          <div class="userName">
            <div class="name">{{ userDetails.name }}</div>
            <img src="@/assets/mail.svg" class="mailImg" />
            <div class="contact">Contact</div>
          </div>
          <div class="rankScore">
            <div class="rank">
              <span
                class="value"
                :style="
                  this.userDetails.active
                    ? { color: '#191919' }
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
                    ? { color: '#191919' }
                    : { color: 'rgba(25, 25, 25, 0.57)' }
                "
                >{{ userDetails.score }}</span
              >
              <span class="field">Score</span>
            </div>
          </div>
        </div>
        <div class="userStatus" v-if="userDetails.active">
          <div class="status unbanned">Active</div>
          <button
            class="adminBanButton"
            @click="manageUser(userDetails.id, 'ban')"
          >
            <img src="@/assets/ban.svg" class="banImg" />
            <div class="adminBanText">Ban Player</div>
          </button>
        </div>
        <div class="userStatus" v-else>
          <div class="status banned">Banned</div>
          <button
            class="adminBanButton"
            @click="manageUser(userDetails.id, 'unban')"
          >
            <img src="@/assets/unban.svg" class="banImg" />
            <div class="adminBanText">Remove Ban</div>
          </button>
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
          :chartData="this.lineGraphData()"
          :options="this.lineGraphOptions"
          class="lineGraph"
          :height="150"
          v-if="this.rows.length > 0"
        />
        <div
          class="adminEmptyDataContainer"
          v-else
          :style="{ alignSelf: 'flex-start' }"
        >
          <span class="adminEmptyData">No Points Scored</span>
        </div>
      </div>
    </div>
    <div class="adminHeadingName">Submissions</div>
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[{ col: 'challenge', redirect: '/admin/challenges/' }]"
      :maxElementPerPage="10"
      v-if="rows.length > 0"
    />
    <div
      class="adminEmptyDataContainer"
      v-else
      :style="{ alignSelf: 'flex-start' }"
    >
      <span class="adminEmptyData">No Correct Submissions</span>
    </div>
  </div>
</template>
<script>
import LineGraph from "../components/LineGraph.vue";
import adminTable from "../components/adminTable";
import moment from "moment";
import ChalService from "../api/admin/challengesAPI";
import SubmissionService from "../api/admin/submissionsAPI";
import PieChart from "../components/PieChart.vue";
import UsersService from "../api/admin/usersAPI";
export default {
  name: "AdminUser",
  components: {
    LineGraph,
    adminTable,
    PieChart,
  },
  data() {
    return {
      confirmDialogs: {
        ban: {
          title: "Want to ban this player?",
          message: `Action will pause participation of player.`,
          button: {
            yes: "Ban",
            no: "Cancel",
          },
        },
        unban: {
          title: "Remove ban from this player?",
          message: `The action will resume participation of player.`,
          button: {
            yes: "Remove ban",
            no: "Cancel",
          },
        },
      },
      scoreSeries: {},
      lineGraphOptions: {
        layout: {
          padding: 10,
        },
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
              scaleLabel: {
                display: true,
                labelString: "Time",
              },
              ticks: {
                source: "auto",
                fontColor: "#393939",
                fontFamily: "Roboto",
                fontStyle: "normal",
              },
              type: "time",
              distribution: "linear",
              time: {
                unit: "hour",
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Score",
              },
              gridLines: {
                color: "#575757",
                drawOnChartArea: false,
              },
              ticks: {
                source: "auto",
                fontColor: "#393939",
                fontFamily: "Roboto",
                fontStyle: "normal",
                min: 0,
              },
            },
          ],
        },
      },
      submissions: {},
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
      userDetails: {
        name: "",
        rank: "",
        score: "",
        active: true,
        id: null,
      },
      rows: [],
      tableCols: [
        {
          id: 1,
          label: "Challenge",
          style: { textAlign: "left", width: "35%", paddingLeft: "40px" },
        },
        {
          id: 2,
          label: "Category",
          style: { textAlign: "center", width: "20%" },
        },
        {
          id: 3,
          label: "Time & Date (+5:30 UTC)",
          style: { paddingRight: "40px", textAlign: "right", width: "45%" },
        },
      ],
    };
  },
  methods: {
    manageUser(userId, action) {
      this.$confirm({
        title: this.confirmDialogs[action].title,
        message: this.confirmDialogs[action].message,
        button: this.confirmDialogs[action].button,
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm) => {
          if (confirm) {
            UsersService.manageUser(userId, action).then((response) => {
              if (response.status !== 200) {
                console.log(response.data);
              } else {
                this.$router.go();
              }
            });
          }
        },
      });
    },
    findScoreSeries(data) {
      data = data.sort((a, b) => {
        return new Date(a.solvedAt) < new Date(b.solvedAt) ? 1 : -1;
      });
      var scoreSeries = [];
      var timeScores = [];
      data.forEach((el, index) => {
        if (index === 0) {
          timeScores[0] = this.userDetails.score;
        } else {
          var currentScore = this.userDetails.score;
          data.slice(0, index).forEach((sub) => {
            currentScore -= sub.points;
          });
          timeScores[index] = currentScore;
        }
        scoreSeries[index] = {
          x: new Date(el.solvedAt),
          y: timeScores[index],
        };
      });
      return scoreSeries;
    },
    lineGraphData() {
      return {
        label: "Data One",
        datasets: [
          {
            backgroundColor: "white",
            borderColor: "#0F6CF8",
            lineTension: 0,
            pointRadius: 5,
            borderWidth: 1,
            data: this.scoreSeries,
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
    ChalService.getChallenges().then((response) => {
      if (response === null) {
        console.log("Error fetching challenges");
        return;
      } else {
        this.chalTags = response.categoryFilterOptions;
        SubmissionService.getSubStats(
          this.chalTags,
          this.$route.params.username
        ).then((response) => {
          if (response === null) {
            console.log("error fetching submission stats");
          } else {
            this.submissions = response;
            console.log(this.submissions);
          }
        });
      }
    });
    UsersService.getUserByUsername(this.$route.params.username).then(
      (response) => {
        if (response.status !== 200) {
          console.log(response.data);
        } else {
          console.log(response.data);
          var data = response.data;
          this.userDetails.id = data.id;
          this.userDetails.name = data.username;
          this.userDetails.score = data.score;
          this.userDetails.rank = data.rank;
          this.userDetails.active = data.status === 0;
          SubmissionService.getUserSubs(this.$route.params.username).then(
            (subData) => {
              subData.forEach((element) => {
                var timeData = moment(element.solvedAt).format(
                  "h:mm:ss; MMMM Do, YYYY"
                );
                this.rows.push({
                  challenge: element.name,
                  category: element.category,
                  timeDateRight: timeData,
                });
              });
              this.scoreSeries = this.findScoreSeries(subData);
            }
          );
        }
      }
    );
  },
};
</script>