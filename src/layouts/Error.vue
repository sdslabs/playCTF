<template>
  <div id="error-layout">
    <div id="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
export default {
  name: "UserLayout",
  components: {
    Footer
  }
};
</script>

<style scoped>
#container {
  padding-left: 25%;
  padding-right: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15rem;
}
</style>
