<template>
  <div class="user-lb-container">
    <div class="user-lb-heading">
      <div class="adminHeadingColor">
        <img :src="leaderboard" class="adminHeadingColor" />
      </div>
      <!-- <div class="adminUserSearchDiv">
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
      </div> -->
    </div>
    <spin-loader v-if="isLoading()" />
    <div v-else-if="users.length > 0">
      <!-- <LeaderboardGraph /> -->
      <admin-table
        v-if="resultQuery.length > 0"
        :tableCols="tableCols"
        :rows="resultQuery"
        :links="[{ col: 'username', redirect: '/user/' }]"
        :maxElementPerPage="25"
        :userData="userInfo"
        :keys="searchQuery"
        :total-users="totalUsers"
        @page-changed="onPageChange"
      />
      <div class="adminEmptyDataContainer" v-else>
        <span class="adminEmptyData">No Users</span>
      </div>
    </div>

    <div class="adminEmptyData" v-else>
      <span> No Notifications posted </span>
    </div>
  </div>
</template>
<script>
import adminTable from "../components/adminTable.vue";
// import LeaderboardGraph from "@/components/LeaderboardGraph.vue";
import UsersService from "../api/admin/usersAPI";
import SpinLoader from "../components/spinLoader.vue";
import { tableCols, colors, lineGraphOptions } from "../constants/constants";
import { leaderboard, search } from "../constants/images";
import LoginUser from "../api/admin/authAPI.js";
export default {
  components: { adminTable, SpinLoader },
  name: "AdminLeaderboard",
  data() {
    return {
      leaderboard,
      search,
      lineColors: colors.lineGraph,
      scoreSeries: [],
      lineGraphOptions: lineGraphOptions(true),
      searchQuery: "",
      tableCols: tableCols.leaderboard,
      users: [],
      displayUsers: [],
      userInfo: {},
      loading: {
        userNotFetched: true,
        usersNotFetched: true
      },
      currentPage: 1,
      totalUsers: 0
    };
  },
  created() {
    this.username = LoginUser.getUserInfo().userName;
  },
  methods: {
    isLoading() {
      for (let apiState in this.loading) {
        if (this.loading[apiState]) {
          return true;
        }
      }
      return false;
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
      this.loading.usersNotFetched = true;
      try {
        const users = await UsersService.getLeaderboard(page);
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
        this.loading.usersNotFetched = false;
      }
    },
    async onPageChange(page) {
      this.currentPage = page;
      await this.fetchUsers(page);
    }
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.displayUsers.filter(user => 
          user["2"].toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.displayUsers;
    }
  },
  async mounted() {
    await Promise.all([
      this.fetchTotalUsers(),
      this.fetchUsers(1)
    ]);
    UsersService.getUserByUsername(this.username)
      .then(response => {
        if (response.data) {
          this.userInfo = response.data;
        if (this.userInfo && this.userInfo.role === 'contestant') {
          this.users = this.users.filter(user => user.status !== 1);
        }
          this.loading.userNotFetched = false;
        }
      })
      .catch(err => {
        console.error("Error fetching user info:", err);
        this.loading.userNotFetched = false;
      });
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "userLeaderboard");
  }
};
</script>
