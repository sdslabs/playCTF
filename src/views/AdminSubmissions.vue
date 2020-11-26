// TODO: Button CSS, filter redirecting and font colour
<template>
  <div id="AdminSubmissions">
    <div class="headerComponent">
      <div>
        Submissions
      </div>
      <v-select
        class="dropdown"
        :options="['Total', 'Correct', 'Incorrect']"
        :value="this.categoryFilter"
        @input="changeFilter"
        :clearable="false"
      />
    </div>
    <div class="leaderboard">
      <table class="leaderboardTable">
        <thead class="tableHead">
          <th class="coloumnHeading">User Name</th>
          <th class="coloumnHeading">Challenge</th>
          <th class="coloumnHeading">Category</th>
          <th class="coloumnHeading">Time & Date (+5:30 UTC)</th>
          <th class="coloumnHeading">Status</th>
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
  </div>
</template>

<script>
export default {
  name: "AdminSubmissions",

  data() {
    return {
      categoryFilter: "All",
      currentPage: 1,
      elementsPerPage: 10,
      ascending: false,
      sortColumn: "",
      rows: [
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Incorrect"
        }
      ]
    };
  },
  methods: {
    changeFilter(value) {
      this.categoryFilter = value;
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
@import "@/assets/scss/adminSubmissions.scss";
</style>
