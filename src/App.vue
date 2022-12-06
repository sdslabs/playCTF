<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
const default_layout = "default-layout";
export default {
  name: "app",
  components: {
    Navbar,
    Footer
  },
  computed: {
    layout() {
      return this.$route.meta.layout || default_layout;
    }
  }
};
</script>

<style lang="scss">
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
  background-color: $theme-color-white;
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
  overflow-y: overlay;
}
</style>
