<template>
  <div class="adminHeader">
    <div class="ctfLogo">
      <img :src="ctfLogo" />
    </div>
    <AdminNav />
    <div class="adminNavTimer">
      <p class="adminTimerMessage">Time Remaining</p>
      <Timer class="adminTimerValue" />
    </div>
    <AdminDropdown />
  </div>
</template>
<script>
import AdminNav from "./AdminNav";
import Timer from "@/components/Timer.vue";
import AdminDropdown from "@/components/AdminDropdown.vue";
import { ctfLogo } from "../constants/images";
export default {
  name: "AdminHeader",
  components: {
    AdminNav,
    Timer,
    AdminDropdown
  },
  data() {
    return {
      ctfLogo
    };
  }
};
</script>
