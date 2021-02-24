<template>
  <div id="default-layout">
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
  name: "DefaultLayout",
  components: {
    Navbar,
    AdminFooter
  }
};
</script>
