<template>
  <div id="user-layout">
    <Navbar />
    <div id="container">
      <slot />
    </div>
    <AdminFooter />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AdminFooter from "../components/AdminFooter.vue";
export default {
  name: "UserLayout",
  components: {
    Navbar,
    AdminFooter
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
