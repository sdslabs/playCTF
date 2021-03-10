<template>
  <div class="home">
    <div class="event">
      <div class="event-info">
        <div class="event-info-text">
          <div class="tagline">Be a part of</div>
          <div class="tagline">{{ configs.name }}</div>
          <div class="description">
            {{ configs.about }}
          </div>
          <div class="description">Starting Time</div>
          <div class="timing">{{ configs.starting_time }}</div>
          <div class="description">Ending Time</div>
          <div class="timing">{{ configs.ending_time }}</div>
          <button class="primary-cta" @click="gotoChallenges">
            See Challenges
          </button>
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
import ConfigApiService from "../api/admin/configureAPI";
export default {
  name: "home",
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
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "AboutCTF");
  },
  mounted() {
    ConfigApiService.getConfigs().then(response => {
      this.configs = response.data;
    });
  },
  methods: {
    gotoChallenges() {
      this.$router.push("/challenges");
    }
  }
};
</script>

<style scoped lang="scss">
button {
  margin-top: 1rem;
}
</style>
