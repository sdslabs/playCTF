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
import { ctfLogo } from "../constants/images";
export default {
  name: "AdminHeader",
  components: {
    AdminNav,
    AdminDropdown
  },
  data() {
    return {
      ctfLogo,
      baseUrl: CONFIG.beastRoot
    };
  }
};
</script>
