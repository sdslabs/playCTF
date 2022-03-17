<template>
  <div class="mainAdminContainer">
    <div class="adminHeadingColor">
      <div class="adminHeadingName">LEADERBOARD</div>
    </div>
    <spin-loader v-if="loading" />
    <div v-else>
      <LeaderboardGraph />
      <div class="adminLbSearchDiv">
        <!-- <div class="adminSearchBar">
          <button class="searchBtn">
            <img :src="search" class="searchImg" />
          </button>
          <input
            v-model="searchQuery"
            placeholder="Search for teams here..."
            class="query"
          />
        </div> -->

        <button class="action-cta" @click="exportLeaderBoardAsCSV()">
          <img :src="download" />
          <span>Export as CSV</span>
        </button>
      </div>

      <admin-table
        v-if="resultQuery.length > 0 && !loading"
        :tableCols="tableCols"
        :rows="resultQuery"
        :links="[{ col: 'username', redirect: '/admin/users/' }]"
        :maxElementPerPage="10"
        :keys="searchQuery"
      />
      <div class="adminEmptyDataContainer" v-else>
        <span class="adminEmptyData">No Users</span>
      </div>
    </div>
  </div>
</template>
<script>
import adminTable from "@/components/adminTable.vue";
import LeaderboardGraph from "@/components/LeaderboardGraph.vue";
import UsersService from "@/api/admin/usersAPI";
import utils from "@/api/utils";
import SpinLoader from "@/components/spinLoader.vue";
import { tableCols, colors, lineGraphOptions } from "../constants/constants";
import { leaderboard, search, download } from "../constants/images";
export default {
  components: { adminTable, SpinLoader, LeaderboardGraph },
  name: "AdminLeaderboard",
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
    async exportLeaderBoardAsCSV() {
      var jsonObject = JSON.stringify(this.resultQuery);
      var csv = await utils.convertToCSV(jsonObject);
      utils.saveAsFile(csv, "leaderboard.csv", "text/csv");
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
