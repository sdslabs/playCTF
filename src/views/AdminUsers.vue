<template>
  <div class="usersContainer">
    <div class="headingDiv">
      <img src="@/assets/images/userPanel.svg" class="heading" />
      <div class="searchBar">
        <button class="searchBtn">
          <img src="@/assets/images/search.svg" class="searchImg" />
        </button>
        <input
          v-model="searchQuery"
          placeholder="Search for teams here..."
          class="query"
        />
      </div>
    </div>
    <div class="sort">
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
      <a
        class="sortOption"
        :class="{ active: sortFilter === 'Rank' }"
        @click="changeSort('Rank')"
        >Rank</a
      >
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
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :redirectLink="'/admin/users/'"
    />
  </div>
</template>
<script>
import adminTable from "../components/adminTable.vue";
export default {
  components: { adminTable },
  name: "AdminLeaderboard",
  data() {
    return {
      sortFilter: "User Name",
      statusFilter: "All",
      searchQuery: "",
      ascending: false,
      sortColumn: "",
      tableCols: [
        {
          id: 1,
          label: "Rank",
          style: {
            width: "72px",
            textAlign: "center"
          }
        },
        {
          id: 2,
          label: "User Name",
          style: {
            width: "120px"
          }
        },
        {
          id: 3,
          label: "E-Mail Address",
          style: {
            textAlign: "left"
          }
        },
        {
          id: 4,
          label: "Score",
          style: {
            width: "72px",
            textAlign: "center"
          }
        },
        {
          id: 5,
          label: "Status",
          style: {
            width: "72px",
            textAlign: "center"
          }
        }
      ],
      rows: [
        {
          rank: "1",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "2",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Banned"
        },
        {
          rank: "3",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "4",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "5",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "6",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "7",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "8",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Banned"
        },
        {
          rank: "9",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "10",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "11",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        },
        {
          rank: "12 ",
          username: "Rockstars",
          email: "coolrockstar@gmail.com",
          score: "874",
          status: "Active"
        }
      ]
    };
  },
  methods: {
    changeFilter(value) {
      this.statusFilter = value;
    },
    changeSort(value) {
      this.sortFilter = value;
    },
    changePage() {
      console.log("submitted");
      this.currentPage = this.jumpPage;
    },
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.rows.sort(function(a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
    num_pages: function num_pages() {
      return Math.ceil(this.rows.length / this.elementsPerPage);
    },
    get_rows: function get_rows() {
      var start = (this.currentPage - 1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.rows.slice(start, end);
    },
    change_page: function change_page(page) {
      this.currentPage = page;
    },
    pageChangeHandler(selectedPage) {
      this.currentPage = selectedPage;
    }
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/adminUsers.scss";
</style>
