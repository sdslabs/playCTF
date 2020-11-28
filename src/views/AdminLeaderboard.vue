<template>
  <div class="lbContainer">
    <div>
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
    <div class="leaderboard">
      <table class="leaderboardTable">
        <thead class="tableHead">
          <th class="columnHeading1">Rank</th>
          <th class="columnHeading2">User Name</th>
          <th class="columnHeading3">Score</th>
        </thead>
        <tbody class="tableBody">
          <tr v-for="row in get_rows()" :key="row.rank" class="leaderRow">
            <td v-for="col in columns" :key="col.id" :class="col">
              {{ row[col] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paginateContainer">
      <div class="pagination">
        <paginate
          v-model="currentPage"
          :page-count="totalPages"
          :click-handler="pageChangeHandler"
          :page-range="3"
          :margin-pages="2"
          :prev-text="'Previous'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-link-class="'pageItem'"
          :prev-link-class="'prevItem'"
          :next-link-class="'nextItem'"
          :break-view-link-class="'breakItemlink-'"
          :no-li-surround="true"
        >
          >
        </paginate>
      </div>
      <div class="jumpPage">
        <span>Jump to</span>
        <form class="form" @submit="changePage">
          <input type="number" v-model="jumpPage" :min="1" :max="totalPages" class="pageInput"/>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AdminLeaderboard",
  data() {
    return {
      jumpPage: 1,
      searchQuery: "",
      currentPage: 1,
      totalPages: 45,
      elementsPerPage: 10,
      ascending: false,
      sortColumn: "",
      rows: [
        {
          rank: "1",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "2",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "3",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "4",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "5",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "6",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "7",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "8",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "9",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "10",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "11",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "12",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "13",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "14",
          teamName: "Rockstars",
          score: "874",
        },
        {
          rank: "15",
          teamName: "Rockstars",
          score: "874",
        },
      ],
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
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/adminLeaderboard.scss";
</style>
