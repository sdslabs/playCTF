<template>
  <div class="adminHeader">
    <div class="ctfLogo">
      <img :src="ctfLogo" />
    </div>
    <AdminNav />
    <AdminDropdown />
  </div>
</template>
<script>
import AdminNav from "./AdminNav";
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
      ctfLogo
    };
  }
};
</script>
