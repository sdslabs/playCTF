<template>
  <div class="home">
    <div class="event">
      <div class="event-info">
        <div class="event-info-text">
          <div class="tagline">Be a part of {{ configs.name }}</div>
          <div class="description">
            {{ configs.about }}
          </div>
          <div class="timing">{{ configs.starting_time }}</div>
          <router-link to="/challenges"
            ><Button text="See Challenges" class="primary-btn"
          /></router-link>
        </div>
        <div class="event-info-img">
          <img class="landing-img" src="@/assets/landing1.svg" />
        </div>
      </div>
      <div class="prize-info">
        <div class="prize-info-text">
          <div class="heading">Prizes to be won</div>
          <div class="description">
            {{ configs.prizes }}
          </div>
        </div>
        <div class="prize-info-img">
          <img class="landing-img" src="@/assets/landing2.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import ConfigApiService from "../api/configureAPI";
import store from '../api/loginToken';
export default {
  name: "home",
  components: {
    Button
  },
  data() {
    return {
      configs: {
        title: "",
        about: "",
        prizes: "",
        starting_time: "",
        ending_time: "",
        timezone: "",
        logo_url: ""
      }
    };
  },
  created() {
    if (store.getters.getState && store.getters.getAccess) {
      this.$router.push("/admin/statistics/");
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "AboutCTF");
  },
  mounted() {
    ConfigApiService.getConfigs().then(response => {
      console.log(response);
      this.configs = response;
    });
  }
};
</script>

<style scoped lang="scss">
button {
  margin-top: 1rem;
}
</style>
