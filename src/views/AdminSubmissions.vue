// TODO: Button CSS, filter redirecting and font colour
<template>
  <div id="AdminSubmissions">
    <div class="headerComponent">
      <div>Submissions</div>
      <v-select
        class="dropdown"
        :options="['All', 'Correct', 'Incorrect']"
        :value="this.categoryFilter"
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
      :links="[
        { col: 'challenge', redirect: '/admin/challenges/' },
        { col: 'username', redirect: '/admin/users/' }
      ]"
      :maxElementPerPage="20"
    />
  </div>
</template>

<script>
import adminTable from "../components/adminTable.vue";
export default {
  name: "AdminSubmissions",
  components: {
    adminTable
  },
  data() {
    return {
      categoryFilter: "All",
      ascending: false,
      sortColumn: "",
      tableCols: [
        { id: 1, label: "User Name", style: { paddingLeft: "20px" } },
        { id: 2, label: "Challenge", style: {} },
        { id: 3, label: "Category", style: { textAlign: "center" } },
        {
          id: 4,
          label: "Time & Date (+5:30 UTC)",
          style: { paddingLeft: "20px" }
        },
        {
          id: 5,
          label: "Status",
          style: { paddingRight: "20px", textAlign: "center" }
        }
      ],
      rows: [
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Correct"
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
        },
        {
          username: "Rockstar",
          challenge: "Polynomial",
          category: "Crypto",
          timeDate: "07:30:43; January 25th, 2020",
          status: "Correct"
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
