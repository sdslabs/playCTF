<template>
  <div class="user-lb-container">
    <div class="user-lb-heading">
      <div class="adminHeadingColor">
        <img :src="leaderboard" class="adminHeadingColor" />
      </div>
      <div class="adminUserSearchDiv">
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
    </div>
    <spin-loader v-if="isLoading()" />
    <div v-else-if="users.length > 0">
      <admin-table
        v-if="resultQuery.length > 0"
        :tableCols="tableCols"
        :rows="resultQuery"
        :links="[]"
        :maxElementPerPage="10"
        :userData="userInfo"
        :keys="searchQuery"
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
      }
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
      })
      .finally(() => {
        this.loading.usersNotFetched = false;
      });
    // hardcoding user for now, need to fix after login integration
    UsersService.getUserByUsername(this.username)
      .then(response => {
        this.userInfo = response.data;
      })
      .finally(() => {
        this.loading.userNotFetched = false;
      });
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "userLeaderboard");
  }
};
</script>
