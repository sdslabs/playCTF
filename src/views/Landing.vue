<template>
  <div class="home">
    <div class="event">
      <div class="event-info">
        <div class="event-info-text">
          <div class="tagline">Be a part of</div>
          <div class="tagline">{{ configData.name }}</div>
          <div class="description">
            {{ configData.about }}
          </div>
          <div class="description">Starting Time</div>
          <div class="timing">{{ configData.starting_time }}</div>
          <div class="description">Ending Time</div>
          <div class="timing">{{ configData.ending_time }}</div>
          <router-link
            style="text-decoration: none"
            v-if="isLoggedIn()"
            to="/challenges"
          >
            <Button text="See Challenges" class="primary-cta"
          /></router-link>
          <router-link style="text-decoration: none" v-else to="/register">
            <Button text="Register Now" class="primary-cta"
          /></router-link>
        </div>
        <div class="event-info-img">
          <img class="landing-img" src="@/assets/landing1.svg" />
        </div>
      </div>
      <div v-if="configData.prizes" class="prize-info">
        <div class="prize-info-text">
          <div class="heading">Prizes to be won</div>
          <div class="description">
            {{ configData.prizes }}
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
import ConfigApiService from "../api/admin/configureAPI";
import Button from "../components/Button.vue";
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
      console.log(this.configs);
      this.configData = this.configs;
    }
  },
  methods: {
    isLoggedIn() {
      let userInfo = this.$store.state.userInfo;
      return userInfo.access && userInfo.role === "contestant";
    }
  }
};
</script>

<style scoped lang="scss">
button {
  margin-top: 1rem;
}
</style>
