<template>
  <div id="admin-landing-layout">
    <AdminLandingHeader />
    <div id="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import AdminLandingHeader from "@/components/AdminLandingHeader.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "AdminLandingLayout",
  components: {
    AdminLandingHeader,
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
