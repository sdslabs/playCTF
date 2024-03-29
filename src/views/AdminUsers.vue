<template>
  <div class="mainAdminContainer">
    <div class="adminHeadingColorSearch">
      <div class="adminHeadingName">USERS PANEL</div>
      <div class="adminUserSearchDiv">
        <div class="adminSearchBar">
          <button class="searchBtn" :disabled="true">
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
    <div class="adminSort">
      <div class="left">
        <span class="sortText">Sort by:</span>
        <a
          class="sortOption"
          :class="{ active: sortFilter === 'User Name' }"
          @click="changeSort('User Name')"
          >User Name</a
        >
        <a
          class="sortOption"
          :class="{ active: sortFilter === 'Score' }"
          @click="changeSort('Score')"
          >Score</a
        >
      </div>
      <div class="right">
        <v-select
          class="dropdown"
          :options="['All', 'Active', 'Banned']"
          :value="this.statusFilter"
          @input="changeFilter"
          :clearable="false"
          :searchable="false"
        >
          <template #selected-option="item" class="selection">
            <span class="filterText">Filter By:</span
            ><span class="filterSelection">{{ item.label }}</span>
          </template>
        </v-select>
      </div>
    </div>
    <spin-loader v-if="loading" />
    <admin-table
      v-if="this.resultQuery.length > 0 && !loading"
      :tableCols="tableCols"
      :rows="resultQuery"
      :links="[{ col: 'username', redirect: '/admin/users/' }]"
      :maxElementPerPage="10"
      :key="reload + searchQuery"
    />
    <div
      class="adminEmptyDataContainer"
      v-if="!loading && this.resultQuery.length === 0"
    >
      <span class="adminEmptyData">{{
        this.emptyDataMessage[this.statusFilter]
      }}</span>
    </div>
  </div>
</template>
<script>
import adminTable from "@/components/adminTable.vue";
import UsersService from "@/api/admin/usersAPI";
import utils from "@/api/utils";
import SpinLoader from "@/components/spinLoader.vue";
import { search, userPanel, download } from "@/constants/images";
import { tableCols } from "@/constants/constants";
export default {
  components: { adminTable, SpinLoader },
  name: "AdminLeaderboard",
  data() {
    return {
      search,
      userPanel,
      download,
      loading: true,
      emptyDataMessage: {
        All: "No Users",
        Active: "No Active Users",
        Banned: "No Banned Users"
      },
      sortFilter: "User Name",
      statusFilter: "All",
      searchQuery: null,
      reload: true,
      ascending: false,
      sortColumn: "",
      tableCols: tableCols.users,
      displayUsers: [],
      users: []
    };
  },
  mounted() {
    UsersService.getUsers()
      //TODO: need to handle api errors
      .then(users => {
        this.users = users;
        this.displayUsers = this.users.sort((a, b) => {
          return a.username > b.username ? 1 : -1;
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    changeFilter(value) {
      this.reload = !this.reload;
      this.statusFilter = value;
      if (value === "All") {
        this.displayUsers = this.users;
      } else {
        this.displayUsers = this.users.filter(el => {
          return el.status == value;
        });
      }
    },
    changeSort(value) {
      this.reload = !this.reload;
      this.sortFilter = value;
      if (value === "User Name") {
        this.displayUsers = this.displayUsers.sort((a, b) => {
          return a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1;
        });
      } else if (value === "Score") {
        this.displayUsers = this.displayUsers.sort((a, b) => {
          return a.rank - b.rank;
        });
      }
    },
    async exportUsersAsCSV() {
      let jsonObject = JSON.stringify(this.resultQuery);
      let csv = await utils.convertToCSV(jsonObject);
      utils.saveAsFile(csv, "users.csv", "text/csv");
      // UsersService.fetchAsCSV(this.sortFilter, this.statusFilter).then(res => {
      //   utils.saveAsFile(res.data, "users.csv", "text/csv");
      // });
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
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminUsers");
  }
};
</script>
