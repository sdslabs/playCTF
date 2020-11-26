<template>
  <div class="adminFooter">
    <div class="playCtf">
      <p class="title">playCTF</p>
      <div class="reachUs">
        <p class="message">Wondering how to host a CTF using playCTF?</p>
        <a class="link" href="www.sdslabs.co">Reach us</a>
      </div>
    </div>
    <div class="logos">
      <img src="@/assets/images/sdslabs-logo.svg" />
      <div class="contactInfo">
        <a href="#"><img src="@/assets/images/fb-logo.svg"/></a>
        <a href="#"><img src="@/assets/images/twitter-logo.svg"/></a>
        <a href="#"><img src="@/assets/images/github-logo.svg"/></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminFooter"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/adminFooter.scss";
</style>
