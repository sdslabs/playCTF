<template>
  <div class="preChall-container">
    <img class="hourglass-img" src="../assets/hourglass.png" alt="hourglass" />
    <div class="preMessage">
      <p>Competition yet to start</p>
    </div>
    <Timer />
  </div>
</template>

<script>
import ConfigApiService from "../api/admin/configureAPI";
import moment from "moment-timezone";
import Timer from "../components/Timer.vue";
export default {
  name: "home",
  components: {
    Timer
  },
  props: ["fetchedData", "configs"],
  data() {
    return {
      configData: {}
    };
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "userAboutCTF");
  },
  mounted() {
    if (!this.fetchedData) {
      ConfigApiService.getConfigs().then(response => {
        this.configData = response.data;
      });
    } else {
      this.configData = this.configs;
    }
  },
  methods: {
    isLoggedIn() {
      let userInfo = this.$store.state.userInfo;
      return userInfo.access && userInfo.role === "contestant";
    },
    convertTimeFormat(time) {
      console.log(time);
      return moment(time, "HH:mm:ss UTC: Z, DD MMMM YYYY, dddd").format(
        "HH:mm:ss UTC: Z, Do MMMM YYYY, dddd"
      );
    }
  }
};
</script>
