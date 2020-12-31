// TODO: Button CSS, filter redirecting and font colour
<template>
  <div class="mainAdminContainer">
    <div class="adSubHeaderComponent">Submissions</div>
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[
        { col: 'challenge', redirect: '/admin/challenges/' },
        { col: 'username', redirect: '/admin/users/' },
      ]"
      :maxElementPerPage="20"
      v-if="this.rows.length > 0"
    />
    <div class="adminEmptyDataContainer" :style="{marginTop:'2rem'}" v-else>
      <span class="adminEmptyData">No Submissions</span>
    </div>
  </div>
</template>

<script>
import SubmissionService from "../api/admin/submissionsAPI";
import adminTable from "../components/adminTable.vue";
import moment from "moment";
export default {
  name: "AdminSubmissions",
  components: {
    adminTable,
  },
  data() {
    return {
      categoryFilter: "All",
      ascending: false,
      sortColumn: "",
      tableCols: [
        {
          id: 1,
          label: "User Name",
          style: { paddingLeft: "40px", textAlign: "left", width: "25%" },
        },
        {
          id: 2,
          label: "Challenge",
          style: { textAlign: "left", width: "25%", paddingLeft: "40px" },
        },
        {
          id: 3,
          label: "Category",
          style: { textAlign: "center", width: "10%" },
        },
        {
          id: 4,
          label: "Time & Date (+5:30 UTC)",
          style: { paddingLeft: "20px", textAlign: "left", width: "40% " },
        },
      ],
      rows: [],
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
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    },
  },
  mounted() {
    SubmissionService.getSubmissions()
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.data);
        } else {
          response.data.forEach((element) => {
            var timeData = moment(element.solvedAt).format(
              "h:mm:ss; MMMM Do, YYYY"
            );
            this.rows.push({
              username: element.username,
              challenge: element.name,
              category: element.category,
              timeDate: timeData,
            });
          });
        }
      });
  },
};
</script>