<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import AdminFooter from "@/components/AdminFooter.vue";
const default_layout = "default-layout";
export default {
  name: "app",
  components: {
    Navbar,
    AdminFooter
  },
  computed: {
    layout() {
      return this.$route.meta.layout || default_layout;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap");
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
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
  min-height: 100%;
  display: flex;
}

@media only screen and (max-width: 1280) {
  #app {
    width: 100%;
    min-height: 100%;
  }
}
body {
  margin: 0;
  overflow-x: hidden;
}
</style>
