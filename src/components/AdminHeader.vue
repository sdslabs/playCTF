<template>
  <div class="adminHeader">
    <div class="ctfLogo">
      <img src="@/assets/ctf-logo.svg" />
    </div>
    <AdminNav />
    <div class="adminNavTimer">
      <p class="adminTimerMessage">{{ time.message }}</p>
      <p class="adminTimerValue">{{ time.value }}</p>
    </div>
    <div class="adminNavDropdown">
      <button class="adminNavDropbtn">
        Admin
        <img src="@/assets/dropdown.svg" />
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
export default {
  name: "AdminHeader",
  components: {
    AdminNav
  },
  data() {
    return {
      time: {
        message: "Time Remaining",
        value: "02:35:15"
      }
    };
  }
};
</script>
