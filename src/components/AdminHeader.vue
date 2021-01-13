<template>
  <div class="adminHeader">
    <div class="ctfLogo">
      <img :src="ctflogo" />
    </div>
    <AdminNav />
    <div class="adminNavTimer">
      <p class="adminTimerMessage">{{ time.message }}</p>
      <p class="adminTimerValue">{{ time.value }}</p>
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
import {ctflogo,dropdown} from "../constants/images"
export default {
  name: "AdminHeader",
  components: {
    AdminNav
  },
  data() {
    return {
      ctflogo,dropdown,
      time: {
        message: "Time Remaining",
        value: "02:35:15"
      }
    };
  }
};
</script>
