<template>
  <div id="error-layout">
    <div id="container">
      <slot />
    </div>
    <AdminFooter />
  </div>
</template>

<script>
import AdminFooter from "../components/AdminFooter.vue";
export default {
  name: "UserLayout",
  components: {
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
