<template>
  <div class="leaderboard">
    <div class="header">
      <div class="heading">LEADER <span class="board">BOARD</span></div>
      <searchbar />
    </div>
    <table class="leaderboardTable">
      <thead class="tableHead">
        <th class="coloumnHeading">Rank</th>
        <th class="coloumnHeading">Teamname</th>
        <th class="coloumnHeading">Score</th>
      </thead>
      <tbody class="tableBody">
        <tr v-for="row in get_rows()" :key="row.rank" class="leaderRow">
          <td v-for="col in columns" :key="col.id">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <div
        class="number"
        v-for="i in num_pages()"
        v-bind:class="[i == currentPage ? 'active' : '']"
        v-on:click="change_page(i)"
        :key="i"
      >
        {{ i }}
      </div>
    </div>

    <div class="page">
      Page
    </div>
  </div>
</template>

<script>
import searchbar from "@/components/Searchbar.vue";
export default {
  name: "leaderboard",
  components: {
    searchbar
  },
  data() {
    return {
      currentPage: 1,
      elementsPerPage: 10,
      ascending: false,
      sortColumn: "",
      rows: [
        {
          rank: "1",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "2",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "3",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "4",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "5",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "6",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "7",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "8",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "9",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "10",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "11",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "12",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "13",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "14",
          teamName: "Rockstars",
          score: "874"
        },
        {
          rank: "15",
          teamName: "Rockstars",
          score: "874"
        }
      ]
    };
  },
  methods: {
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
@import "@/assets/scss/leaderboard.scss";
</style>
