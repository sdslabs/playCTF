<template>
  <div class="user-lb-container">
    <div class="user-lb-heading">
      <div class="adminHeadingColor">
        <img :src="leaderboard" class="adminHeadingColor" />
      </div>
      <div class="user-searchbar-div">
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
    <spin-loader v-if="loading" />
    <div v-else>
      <admin-table
        v-if="resultQuery.length > 0"
        :tableCols="tableCols"
        :rows="resultQuery"
        :links="[{ col: 'username', redirect: '/admin/users/' }]"
        :maxElementPerPage="10"
      />
      <div class="adminEmptyDataContainer" v-else>
        <span class="adminEmptyData">No Users</span>
      </div>
    </div>
  </div>
</template>
<script>
import adminTable from "../components/adminTable.vue";
import UsersService from "../api/admin/usersAPI";
import SpinLoader from "../components/spinLoader.vue";
import { tableCols, colors, lineGraphOptions } from "../constants/constants";
import { leaderboard, search } from "../constants/images";
import store from '../api/loginToken';
export default {
  components: { adminTable, SpinLoader },
  name: "AdminLeaderboard",
  data() {
    return {
      leaderboard,
      search,
      loading: true,
      lineColors: colors.lineGraph,
      scoreSeries: [],
      lineGraphOptions: lineGraphOptions(true),
      searchQuery: "",
      tableCols: tableCols.leaderboard,
      users: [],
      displayUsers: []
    };
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
  created() {
    if (!store.getters.getState || store.getters.getAccess) {
      this.$router.push("/");
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
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "Leaderboard");
  }
};
</script>
