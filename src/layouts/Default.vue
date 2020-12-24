<template>
  <div id="default-layout">
    <Navbar />
    <div id="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Footer
  }
};
</script>

