<template>
  <div class="pre-chall-container">
    <img class="hourglass-img" src="@/assets/team-goals.png" alt="teamgoals" />
    <div class="pre-message">
      <p class="pre-message-text">
        Competition ended
      </p>
    </div>
    <router-link
      style="text-decoration: none"
      to="/leaderboard"
    >
      <Button text="View Results" class="primary-cta"
    /></router-link>
  </div>
</template>

<script>
import ConfigApiService from "../api/admin/configureAPI";
import Button from "./Button.vue";
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
    this.$store.commit("updateCurrentPage", "userChallenges");
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
};
</script>
