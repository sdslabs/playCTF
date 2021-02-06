<template>
  <div class="home">
    <div class="event">
      <div class="event-info">
        <div class="event-info-text">
          <div class="tagline">Be a part of noobCTF 2019</div>
          <div class="description">
            noobCTF is a free computer security game targeted at middle and high
            school students, created by security experts at SDSLabs.
          </div>
          <div class="timing">4th December 2019, Sunday</div>
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
            The real gem to acquire is the experience time bound competition
            provides. However, Participants from the top three winning teams get
            to appear directly for SDSLabs interview round.
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
export default {
  name: "home",
  components: {
    Button,
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "AboutCTF");
  },
};
</script>

<style scoped lang="scss">
button {
  margin-top: 1rem;
}
</style>
