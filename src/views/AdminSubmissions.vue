<template>
  <div class="mainAdminContainer">
    <div class="adSubHeaderComponent">Submissions</div>
    <spin-loader v-if="loading" />
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[
        { col: 'challenge', redirect: '/admin/challenges/' },
        { col: 'username', redirect: '/admin/users/' }
      ]"
      :maxElementPerPage="20"
      v-if="this.rows.length > 0 && !loading"
    />
    <div
      class="adminEmptyDataContainer"
      v-if="!loading && this.rows.length === 0"
    >
      <span class="adminEmptyData">No Submissions</span>
    </div>
  </div>
</template>

<script>
import SubmissionService from "../api/admin/submissionsAPI";
import adminTable from "../components/adminTable.vue";
import moment from "moment";
import spinLoader from "../components/spinLoader.vue";
import { tableCols } from "../constants/constants";
export default {
  name: "AdminSubmissions",
  components: {
    adminTable,
    spinLoader
  },
  data() {
    return {
      rows: [],
      tableCols: tableCols.adminSumbissions,
      loading: true
    };
  },
  methods: {},
  mounted() {
    SubmissionService.getSubmissions()
      .then(response => {
        if (response.status !== 200) {
          console.log(response.data);
        } else {
          response.data.forEach(element => {
            let timeData = moment(element.solvedAt).format(
              "h:mm:ss; MMMM Do, YYYY"
            );
            this.rows.push({
              username: element.username,
              challenge: element.name,
              category: element.category,
              timeDate: timeData
            });
          });
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
