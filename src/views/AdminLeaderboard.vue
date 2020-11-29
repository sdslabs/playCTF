<template>
  <div class="lbContainer">
    <div class="headingDiv">
      <img src="@/assets/images/leaderboard.svg" class="heading" />
    </div>
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
      searchQuery: "",
      ascending: false,
      sortColumn: "",
      tableCols: [
        {
          id: 1,
          label: "Rank",
          style: {
            textAlign: "center",
            width: "72px"
          }
        },
        {
          id: 2,
          label: "User Name",
          style: {
            width: "600px"
          }
        },
        {
          id: 3,
          label: "Score",
          style: {
            textAlign: "center",
            width: "72px"
          }
        }
      ],
      rows: [
        {
          rank: "1",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "2",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "3",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "4",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "5",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "6",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "7",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "8",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "9",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "10",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "11",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "12",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "13",
          username: "Rockstars",
          score: "874"
        },
        {
          rank: "14",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "15",
          username: "Rockstars",
          score: "874"
        }
      ]
    };
  },
  methods: {
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
@import "@/assets/scss/adminLeaderboard.scss";
</style>
