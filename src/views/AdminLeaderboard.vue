<template>
  <div class="mainAdminContainer">
    <div class="adminHeadingColor">
      <div class="adminHeadingName">LEADERBOARD</div>
    </div>
    <spin-loader v-if="loading" />
    <div v-else>
      <!-- <LeaderboardGraph /> -->
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
        :links="[{ col: '2', redirect: '/admin/users/' }]"
        :maxElementPerPage="25"
        :keys="searchQuery"
        :total-users="totalUsers"
        @page-changed="onPageChange"
      />
      <div class="adminEmptyDataContainer" v-else>
        <span class="adminEmptyData">No Users</span>
      </div>
    </div>
  </div>
</template>
<script>
import adminTable from "@/components/adminTable.vue";
// import LeaderboardGraph from "@/components/LeaderboardGraph.vue";
import UsersService from "@/api/admin/usersAPI";
import utils from "@/api/utils";
import SpinLoader from "@/components/spinLoader.vue";
import { tableCols, colors, lineGraphOptions } from "../constants/constants";
import { leaderboard, search, download } from "../constants/images";
export default {
  components: { adminTable, SpinLoader },
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
      state: {},
      totalUsers: 0
    };
  },
  methods: {
    async exportLeaderBoardAsCSV() {
      var jsonObject = JSON.stringify(this.resultQuery);
      var csv = await utils.convertToCSV(jsonObject);
      utils.saveAsFile(csv, "leaderboard.csv", "text/csv");
    },
    async fetchTotalUsers() {
      try {
        const response = await UsersService.getUserCount();
        this.totalUsers = response.user_count || 0;
      } catch (err) {
        console.error('Error fetching user count:', err);
        this.totalUsers = 0;
      }
    },
    async fetchUsers(page = 1) {
      this.loading = true;
      try {
        const users = await UsersService.getLeaderboard(page);
        if (!users || users.length === 0) {
          this.users = [];
          this.displayUsers = [];
          return;
        }
        this.users = users.map(element => ({
          "1": element.rank,
          "2": element.username,
          "3": element.score
        }));
        this.displayUsers = [...this.users];
      } catch (err) {
        console.error('Error fetching users:', err);
        this.users = [];
        this.displayUsers = [];
      } finally {
        this.loading = false;
      }
    },

    async onPageChange(page) {
      await this.fetchUsers(page);
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
    this.fetchUsers();
    this.fetchTotalUsers();
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminLeaderboard");
  }
};
</script>
