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
      :links="[{ col: 'user name', redirect: '/admin/users/' }]"
      :maxElementPerPage="10"
      :key="reload + searchQuery"
      :total-users="totalUsers"
      @page-changed="onPageChange"
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
      users: [],
      totalUsers: 0
    };
  },
  mounted() {
    UsersService.getUsers()
      .then(users => {
        this.users = users.map(element => ({
          "1": element.rank,
          "2": element.username,
          "3": element.email,
          "4": element.score,
          "5": element.status
        }));
        this.applySort();
        this.totalUsers = this.users.length;
        this.fetchUsers(1);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    onPageChange(page) {
      this.fetchUsers(page);
    },
    async fetchUsers(page = 1) {
      const filteredAndSortedUsers = this.applySort([...this.users]);
      this.displayUsers = filteredAndSortedUsers.slice((page - 1) * 10, page * 10);
      this.totalUsers = filteredAndSortedUsers.length;
    },
    changeFilter(value) {
      this.statusFilter = value;
      this.reload = !this.reload;
      this.fetchUsers(1);
    },
    changeSort(value) {
      this.sortFilter = value;
      this.reload = !this.reload;
      this.fetchUsers(1);
    },
    applySort(users = this.users) {
      let filtered = [...users];
      
      // Apply status filter
      if (this.statusFilter !== "All") {
        filtered = filtered.filter(user => user["5"] === this.statusFilter);
      }

      // Apply sorting
      if (this.sortFilter === "User Name") {
        filtered.sort((a, b) => a["2"].localeCompare(b["2"]));
      } else if (this.sortFilter === "Score") {
        filtered.sort((a, b) => b["4"] - a["4"]);
      }

      return filtered;
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
            .every(v => item["2"].toLowerCase().includes(v));
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
