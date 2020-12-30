<template>
  <div class="mainAdminContainer">
    <div class="adminHeadingColor">
      <img src="@/assets/leaderboard.svg" class="adminHeadingColor" />
    </div>
    <div class="adminLbSearchDiv">
    <div class="adminSearchBar">
      <button class="searchBtn">
        <img src="@/assets/search.svg" class="searchImg" />
      </button>
      <input
        v-model="searchQuery"
        placeholder="Search for teams here..."
        class="query"
      />
    </div>
    </div>
    <admin-table
      :tableCols="tableCols"
      :rows="resultQuery"
      :links="[{ col: 'username', redirect: '/admin/users/' }]"
      :maxElementPerPage="10"
    />
  </div>
</template>
<script>
import adminTable from "../components/adminTable.vue";
import UsersService from "@/api/admin/usersAPI";
export default {
  components: { adminTable },
  name: "AdminLeaderboard",
  data() {
    return {
      searchQuery: "",
      ascending: false,
      sortColumn: "",
      tableCols: [
        {
          id: 1,
          label: "Rank",
          style: {
            textAlign: "center",
            width: "10%",
          },
        },
        {
          id: 2,
          label: "User Name",
          style: {
            width: "75%",
            paddingLeft: "40px",
            textAlign: "left",
          },
        },
        {
          id: 3,
          label: "Score",
          style: {
            textAlign: "center",
            width: "15%",
          },
        },
      ],
      users: [],
      displayUsers: [],
    };
  },
  methods: {
    changePage() {
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

      this.rows.sort(function (a, b) {
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
    },
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.displayUsers.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.username.toLowerCase().includes(v));
        });
      } else {
        return this.displayUsers;
      }
    },
  },
  mounted() {
    UsersService.getUsers().then((users) => {
      console.log(users);
      if (users === null) {
        console.log("error fetching users");
        return;
      }
      users.forEach((element) => {
        this.users.push({
          rank: element.rank,
          username: element.username,
          score: element.score,
        });
      });
      this.displayUsers = this.users.sort((a, b) => {
        return a.rank > b.rank ? 1 : -1;
      });
    });
  },
};
</script>
