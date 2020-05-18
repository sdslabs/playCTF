<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "app",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap");
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
@import "@/styles/main.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1vw;
  overflow: hidden;
  z-index: 1;
}

@media only screen and (max-width: 1280) {
  #app {
    width: 100%;
  }
}
</style>
