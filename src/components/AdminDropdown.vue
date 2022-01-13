<template>
  <div
    class="adminNavDropdown"
    @mouseover="showDropdownContent(true)"
    @mouseleave="showDropdownContent(false)"
  >
    <button class="adminNavDropbtn">
      {{ username }}
      <img :src="dropdown" />
    </button>
    <div v-if="displayDropdownContent" class="adminNavDropdownContent">
      <a class="adminNavDropdownLink cursor-pointer" @click="logout()"
        >Logout</a
      >
    </div>
  </div>
</template>

<script>
import { dropdown } from "../constants/images";
import LoginUser from "../api/admin/authAPI.js";
export default {
  name: "AdminDropdown",
  data() {
    return {
      dropdown,
      username: "",
      displayDropdownContent: false
    };
  },
  created() {
    this.username = LoginUser.getUserInfo().userName;
  },
  methods: {
    logout() {
      LoginUser.logout();
      this.$router.push("/login");
    },
    showDropdownContent(showContent) {
      this.displayDropdownContent = showContent;
    }
  }
};
</script>
