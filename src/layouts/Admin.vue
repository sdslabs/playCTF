<template>
  <div id="admin-layout">
    <AdminHeader />
    <div id="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "AdminLayout",
  components: {
    AdminHeader,
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
