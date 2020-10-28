<template>
  <div class="adminHeader">
    <div class="ctfLogo">
      <img src="@/assets/images/ctf-logo.svg" />
    </div>
    <AdminNav />
    <div class="nav-timer">
      <p class="timer-message">{{ time.message }}</p>
      <p class="timer-value">{{ time.value }}</p>
    </div>
    <div class="dropdown">
      <button class="dropbtn">
        Admin
        <img src="@/assets/images/dropdown.svg" />
      </button>
      <div class="dropdown-content">
        <a class="dropdown-link" href="#">Link 1</a>
        <a class="dropdown-link" href="#">Link 2</a>
        <a class="dropdown-link" href="#">Link 3</a>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/adminHeader.scss";
</style>