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
      loading: true
    };
  },
  methods: {
    async exportUsersAsCSV() {
      SubmissionService.fetchAsCSV().then(res => {
        utils.saveAsFile(res.data, "submissions.csv", "text/csv");
      });
    }
  },
  async mounted() {
    let response = await SubmissionService.getSubmissions();
    var submissions = [];
    response.forEach((element, index) => {
      submissions.push({
        username: element.username,
        challenge: element.name,
        tags: getChalTags(element.tags),
        timeDate: element.solvedTime
      });
    });
    this.rows = submissions;
    this.loading = false;
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminSubmissions");
  }
};
</script>
