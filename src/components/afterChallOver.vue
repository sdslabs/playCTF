<template>
  <div class="postChall-container">
    <img
      class="team-goals-img"
      src="../assets/team-goals.png"
      alt="teamgoals"
    />
    <div class="postMessage">
      Competition ended
    </div>
    <router-link
      style="text-decoration: none"
      v-if="isLoggedIn()"
      to="/leaderboard"
    >
      <Button text="View Results" class="primary-cta"
    /></router-link>
  </div>
</template>

<script>
import ConfigApiService from "../api/admin/configureAPI";
import Button from "./Button.vue";
import moment from "moment-timezone";
export default {
  name: "home",
  components: {
    Button
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
