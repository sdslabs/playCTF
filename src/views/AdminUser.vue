<template>
  <div class="mainAdminContainer">
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
              <span class="value">{{ userDetails.rank }}</span>
              <span class="field">Rank</span>
            </div>
            <div class="score">
              <span class="value">{{ userDetails.score }}</span>
              <span class="field">Score</span>
            </div>
          </div>
        </div>
        <div class="userStatus" v-if="userDetails.active">
          <div class="status unbanned">Active</div>
          <button class="adminBanButton">
            <img src="@/assets/ban.svg" class="banImg" />
            <div class="adminBanText">Ban Player</div>
          </button>
        </div>
        <div class="userStatus" v-else>
          <div class="status banned">Banned</div>
          <button class="adminBanButton">
            <img src="@/assets/unban.svg" class="banImg" />
            <div class="adminBanText">Remove Ban</div>
          </button>
        </div>
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
    <div class="adminHeadingName">Submissions</div>
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[{ col: 'challenge', redirect: '/admin/challenges/' }]"
      :maxElementPerPage="10"
    />
  </div>
</template>
<script>
import axios from "axios";
import adminTable from "../components/adminTable";
import moment from "moment";
import ChalService from "../api/admin/challengesAPI";
import SubmissionService from "../api/admin/submissionsAPI";
import PieChart from "../components/PieChart.vue";
export default {
  name: "AdminUser",
  components: {
    adminTable,
    PieChart
  },
  data() {
    return {
      submissions: {},
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: "right",
        },
      },
      userDetails: {
        name: "",
        rank: "",
        score: "",
        active: true,
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
    var postData = new FormData();
    postData.append("username", this.$route.params.username);
    axios({
      method: "post",
      url: `${this.$store.getters.hostUrl}/api/info/user`,
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.status !== 200) {
        console.log(response.data);
      } else {
        console.log(response.data);
        var data = response.data;
        this.userDetails.name = data.username;
        this.userDetails.score = data.score;
        this.userDetails.rank = data.rank;
        this.userDetails.active = data.status === 0;
      }
    });

    axios
      .post(`${this.$store.getters.hostUrl}/api/info/submissions`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.data);
        } else {
          var data = response.data;
          data = data.filter((el) => {
            return el.username === this.$route.params.username;
          });
          data.forEach((element) => {
            var timeData = moment(element.solvedAt).format(
              "h:mm:ss; MMMM Do, YYYY"
            );
            this.rows.push({
              challenge: element.name,
              category: element.category,
              timeDateRight: timeData,
            });
          });
        }
      });
  },
};
</script>