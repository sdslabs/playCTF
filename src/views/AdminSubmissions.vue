<template>
  <div class="mainAdminContainer">
    <div class="adHeaderComponent">
      <div class="adminHeadingName">Submissions</div>
      <button class="action-cta" @click="exportUsersAsCSV()">
        <img :src="download" />
        <span>Export as CSV</span>
      </button>
    </div>
    <spin-loader v-if="loading" />
    <admin-table
      :tableCols="tableCols"
      :rows="rows"
      :links="[
        { col: '2', redirect: '/admin/challenges/' },
        { col: '1', redirect: '/admin/users/' }
      ]"
      :maxElementPerPage="20"
      :total-users="totalSubmissions"
      v-if="this.rows.length > 0 && !loading"
      @page-changed="onPageChange"
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
import spinLoader from "../components/spinLoader.vue";
import utils from "@/api/utils";
import { download } from "../constants/images";
import { tableCols } from "../constants/constants";
import { getChalTags } from "../utils/challenges";
export default {
  name: "AdminSubmissions",
  components: {
    adminTable,
    spinLoader
  },
  data() {
    return {
      download,
      rows: [],
      tableCols: tableCols.adminSumbissions,
      loading: true,
      currentPage: 1,
      totalSubmissions: 0,
      submissions: [],
      displaySubmissions: []
    };
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page;
      this.fetchUsers(page);
    },
    async exportUsersAsCSV() {
      SubmissionService.fetchAsCSV().then(res => {
        utils.saveAsFile(res.data, "submissions.csv", "text/csv");
      });
    },
    async fetchUsers(page = 1) {
      this.loading = true;
      this.displaySubmissions = this.submissions.slice((page - 1) * 10, page * 10);
      this.loading = false;
      this.rows = this.displaySubmissions;
    }
  },
  async mounted() {
    let response = await SubmissionService.getSubmissions();
    var submissions = [];
    response.forEach((element, index) => {
      submissions.push({
        "1": element.username,
        "2": element.name,
        "3": getChalTags(element.tags),
        "4": element.solvedTime
      });
    });
    this.submissions = submissions;
    this.totalSubmissions = submissions.length;
    this.loading = false;
    this.fetchUsers(1);
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminSubmissions");
  }
};
</script>
