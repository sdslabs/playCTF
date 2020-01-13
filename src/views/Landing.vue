<template>
  <div class="home">
    <div class="event">
      <div class="event-info">
        <div class="tagline">Be a part of noobCTF 2019</div>
        <div class="description">
          noobCTF is a free computer security game targeted at middle and high
          school students, created by security experts at SDSLabs.
        </div>
        <div class="timing">4th December 2019, Sunday</div>
        <button class="register">Register now</button>
      </div>
      <div class="prize-info">
        <div class="heading">Prizes to be won</div>
        <div class="description">
          The real gem to acquire is the experience time bound competition
          provides. However, Participants from the top three winning teams get
          to appear directly for SDSLabs interview round.
        </div>
        <div class="dropdown">
            Learn more
            <img src="@/assets/images/dropdown.svg" />
        </div>
      </div>
    </div>
    <img class="img1" src="@/assets/images/landing1.svg" />
    <img class="img2" src="@/assets/images/landing2.svg" />
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/landing.scss";
</style>
