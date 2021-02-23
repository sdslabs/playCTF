<template>
  <div class="adminHeader">
    <div class="ctfLogo">
      <img :src="`${baseUrl}/api/info/logo`" />
    </div>
    <AdminNav />
    <AdminDropdown />
  </div>
</template>
<script>
import AdminNav from "./AdminNav";
import { CONFIG } from "@/config/config";
import AdminDropdown from "@/components/AdminDropdown.vue";
export default {
  name: "AdminHeader",
  components: {
    AdminNav,
    AdminDropdown
  },
  data() {
    return {
      baseUrl: CONFIG.beastRoot
    };
  }
};
</script>
