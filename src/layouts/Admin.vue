<template>
  <div id="admin-layout">
    <AdminHeader />
    <div id="container">
      <slot />
    </div>
    <AdminFooter />
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import AdminFooter from "../components/AdminFooter.vue";
export default {
  name: "AdminLayout",
  components: {
    AdminHeader,
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
