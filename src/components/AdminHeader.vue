<template>
  <div class="adminHeader">
    <div class="ctfLogo">
      <img :src="ctfLogo" />
    </div>
    <AdminNav />
    <div class="adminNavTimer">
      <p class="adminTimerMessage">Time Remaining</p>
      <Timer class="adminTimerValue"/>
    </div>
    <div class="adminNavDropdown">
      <button class="adminNavDropbtn">
        Admin
        <img :src="dropdown" />
      </button>
      <div class="adminNavDropdownContent">
        <a class="adminNavDropdownLink" href="#">Link 1</a>
        <a class="adminNavDropdownLink" href="#">Link 2</a>
        <a class="adminNavDropdownLink" href="#">Link 3</a>
      </div>
    </div>
  </div>
</template>
<script>
import AdminNav from "./AdminNav";
import Timer from "@/components/Timer.vue";
import { ctfLogo, dropdown } from "../constants/images";
export default {
  name: "AdminHeader",
  components: {
    AdminNav,
    Timer
  },
  data() {
    return {
      ctfLogo,
      dropdown,
    };
  }
};
</script>
