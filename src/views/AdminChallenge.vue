<template>
  <div class="mainAdminContainer">
    <div class="adminChalInfo">
      <div class="infoDetails">
        <span class="name">{{ name }}</span>
        <span class="category">{{ category }}</span>
        <button class="adminBanButton">
          <img src="@/assets/edit.svg" class="banImg" /><span
            class="adminBanText"
            >Edit</span
          >
        </button>
        <span
          class="status"
          :class="{
            deployed: status === 'Deployed',
            purged: status === 'Purged',
            undeployed: status === 'Undeployed',
          }"
          >{{ status }}</span
        >
      </div>
      <div class="infoStats">
        <vue-confirm-dialog class="manageChalConfirmBox"></vue-confirm-dialog>
        <div class="pointSolves">
          <div class="point">
            <span class="value">{{ points }}</span>
            <span class="field">Points</span>
          </div>
          <div class="solves">
            <span class="value">{{ solves }}</span>
            <span class="field">Solves</span>
          </div>
        </div>
        <div v-if="status === 'Deployed'" class="changeChallengeStatus">
          <button
            class="adminBanButton"
            @click="manageChallenge(name, 'undeploy')"
          >
            <img src="@/assets/undeploy.svg" class="banImg" /><span
              class="adminBanText"
              >Undeploy</span
            >
          </button>
          <button
            class="adminBanButton"
            @click="manageChallenge(name, 'purge')"
          >
            <img src="@/assets/purge.svg" class="banImg" /><span
              class="adminBanText"
              >Purge</span
            >
          </button>
        </div>
        <div v-if="status === 'Undeployed'" class="changeChallengeStatus">
          <button
            class="adminBanButton"
            @click="manageChallenge(name, 'deploy')"
          >
            <img src="@/assets/play.svg" class="banImg" /><span
              class="adminBanText"
              >Deploy</span
            >
          </button>
          <button
            class="adminBanButton"
            @click="manageChallenge(name, 'purge')"
          >
            <img src="@/assets/purge.svg" class="banImg" /><span
              class="adminBanText"
              >Purge</span
            >
          </button>
        </div>
        <div v-if="status === 'Purged'" class="changeChallengeStatus">
          <button
            class="adminBanButton"
            @click="manageChallenge(name, 'deploy')"
          >
            <img src="@/assets/play.svg" class="banImg" /><span
              class="adminBanText"
              >Deploy</span
            >
          </button>
        </div>
      </div>
      <div class="aboutChallenge aboutText">
        {{ about }}
      </div>
      <div class="port aboutText">Port : {{ port }}</div>
      <div class="host aboutText">
        {{ `${this.$store.getters.challengeHostUrl}:${this.port}` }}
      </div>
      <button class="adminBanButton testRun">
        <img src="@/assets/play.svg" class="banImg" /><span class="adminBanText"
          >Test Run</span
        >
      </button>
    </div>
    <div class="adChalStatistics">
      <div class="adminHeadingName">Statistics</div>
      <div class="adChalSubmissions">
        <div class="subheadingName">Submissions</div>
        <div class="info">
          Total {{ this.solves }} correct submissions are made
        </div>
      </div>
      <div class="adChalSolves">
        <div class="leftCol">
          <div class="subheadingName">Solve Percentages</div>
          <div class="info">
            There were total <b>{{ this.activeUsers }} Active</b> users, out of
            which, <b>{{ this.solves }} ({{ this.solvePercentage() }}%)</b> are
            able to solve this challenge.
          </div>
        </div>
        <div class="rightCol">
          <BarGraphVertical
            :chartData="this.barData()"
            :options="this.barChartOptions"
            class="graph"
            :height="150"
          />
        </div>
      </div>
    </div>
    <hr class="hrSeparator" />
    <div class="adminHeadingName">Submissions</div>
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[{ col: 'username', redirect: '/admin/users/' }]"
      :maxElementPerPage="10"
    />
  </div>
</template>
<script>
import axios from "axios";
import BarGraphVertical from "../components/BarGraphVertical.vue";
import AdminTable from "../components/adminTable.vue";
import moment from "moment";
import UsersService from "../api/admin/usersAPI";
export default {
  components: { BarGraphVertical, AdminTable },
  name: "AdminChallenge",
  data() {
    return {
      tableCols: [
        {
          id: 1,
          label: "User Name",
          style: { paddingLeft: "40px", textAlign: "left", width: "40%" },
        },
        {
          id: 2,
          label: "Time & Date (+5:30 UTC)",
          style: { paddingRight: "40px", textAlign: "right", width: "60% " },
        },
      ],
      rows: [],
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: "Solve %",
              },
              ticks: {
                stepSize: 33,
                min: 0,
                max: 100,
              },
            },
          ],
        },
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        ],
      },
      name: "",
      category: "",
      status: "",
      points: "",
      solves: "",
      about: "",
      port: "",
      loaded: false,
      confirmDialogs: {
        purge: {
          title: "Purge this Challenge?",
          message: `Action will pause the participation of players.`,
          button: {
            yes: "Purge",
            no: "Cancel",
          },
        },
        deploy: {
          title: "Deploy this Challenge?",
          message: `The challenge would go live after this action. The players would be able to attempt this challenge.`,
          button: {
            yes: "Deploy",
            no: "Cancel",
          },
        },
        undeploy: {
          title: "Undeploy this Challenge?",
          message: `The challenge ${this.$route.params.id} will be marked as "Down for maintenance" after this section.`,
          button: {
            yes: "Undeploy",
            no: "Cancel",
          },
        },
      },
    };
  },
  methods: {
    barData() {
      return {
        datasets: [
          {
            backgroundColor: ["rgba(76, 128, 165, 0.75)"],
            data: [(this.solves / this.activeUsers) * 100],
          },
        ],
      };
    },
    solvePercentage() {
      return (this.solves / this.activeUsers) * 100;
    },
    manageChallenge(name, action) {
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
            var postData = new FormData();
            postData.append("name", name);
            postData.append("action", action);
            axios({
              method: "post",
              url: `${this.$store.getters.hostUrl}/api/manage/challenge/`,
              data: postData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
              if (response.status !== 200) {
                console.log(response.data);
              } else {
                if (action === "purge") {
                  this.$router.push("/admin/challenges");
                } else {
                  this.$router.go();
                }
              }
            });
          }
        },
      });
    },
  },
  mounted() {
    UsersService.getUserStats().then((response) => {
      if (response.status !== 200) {
        console.log(response);
      } else {
        this.activeUsers = response.data.unbanned_users;
      }
    });
    var postData = new FormData();
    postData.append("name", this.$route.params.id);
    axios({
      method: "post",
      url: `${this.$store.getters.hostUrl}/api/info/challenge/info`,
      data: postData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      if (response.status !== 200) {
        console.log(response.data);
      } else {
        console.log(response.data);
        this.loaded = true;
        var data = response.data;
        this.name = data.Name;
        this.category = data.Category;
        this.status = data.Status;
        this.points = data.Points;
        this.solves = data.SolvesNumber;
        this.about = data.Desc;
        if (data.Ports !== null) {
          this.port = data.Ports[0];
        }
      }
    });

    axios
      .post(`${this.$store.getters.hostUrl}/api/info/submissions`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.data);
        } else {
          response.data.forEach((element) => {
            if (element.name == this.$route.params.id) {
              var timeData = moment(element.solvedAt).format(
                "h:mm:ss; MMMM Do, YYYY"
              );
              this.rows.push({
                username: element.username,
                timeDateRight: timeData,
              });
            }
          });
        }
      });
  },
};
</script>
