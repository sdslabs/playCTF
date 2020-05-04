<template>
  <div class="leaderboard">
    <div class="header">
      <div class="heading">LEADER <span class="board">BOARD</span></div>
      <searchbar />
    </div>
    <table class="leaderboardTable" cellspacing="0" cellpadding="0">
      <thead class="tableHead">
        <th class="coloumnHeading rank">Rank</th>
        <th class="coloumnHeading teamName">Team Name</th>
        <th class="coloumnHeading score">Score</th>
      </thead>
      <tbody class="tableBody">
        <tr class="leaderboardRow userInfo">
          <td>{{ user.rank }}</td>
          <td>{{ user.teamName }}</td>
          <td>{{ user.score }}</td>
        </tr>
        <tr v-for="row in get_rows()" :key="row.rank" class="leaderboardRow">
          <td v-for="col in columns" :key="col.id">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <div class="numeric-pagination">
        <div class="pagination-previous" v-on:click="prev_page()">Previous</div>
        <div
          class="number"
          v-for="i in num_pages()"
          v-bind:class="[i == currentPage ? 'active' : '']"
          v-on:click="change_page(i)"
          :key="i"
        >
          {{ i }}
        </div>
        <div class="pagination-next" v-on:click="next_page()">Next</div>
      </div>
      <div class="search-pagination">
        <p class="search-pagination-text">Jump to</p>
        <input
          class="pagination-search-page"
          placeholder="1"
          @keyup.enter="change_page(pageNumber)"
          v-model="pageNumber"
          type="text"
        />
      </div>
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
      pageNumber: 1,
      user: {
        rank: "35",
        teamName: "Bandit",
        score: "98"
      },
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
    methods: {
      updateGlobal: function() {
        this.$currentPage = "landing";
      }
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
    next_page: function next_page() {
      this.currentPage = this.currentPage + 1;
    },
    prev_page: function prev_page() {
      this.currentPage = this.currentPage - 1;
    }
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "Leaderboard");
  }
};
</script>
