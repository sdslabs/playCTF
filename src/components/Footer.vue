<template>
  <div class="footer">
    <p class="poweredBy"> Powered by</p>
    <img src="@/assets/images/sdslabs-logo.svg">
    <a class="link" href="www.sdslabs.co">www.sdslabs.co</a>
    <div class="contactInfo">
      <a href="#"><img src="@/assets/images/fb-logo.svg"></a>
      <a href="#"><img src="@/assets/images/twitter-logo.svg"></a>
      <a href="#"><img src="@/assets/images/github-logo.svg"></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/assets/scss/footer.scss";
</style>
