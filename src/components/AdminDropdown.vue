<template>
  <div class="adminNavDropdown">
    <button class="adminNavDropbtn">
      Admin
      <img :src="dropdown" />
    </button>
    <div class="adminNavDropdownContent">
      <a class="adminNavDropdownLink" @click="logout()">Logout</a>
    </div>
  </div>
</template>

<script>
import { dropdown } from "../constants/images";
import store from "../store/index";
export default {
  name: "AdminDropdown",
  data() {
    return {
      dropdown
    };
  },
  methods: {
    logout() {
      store.commit("logout");
      this.$router.push("/login");
    }
  }
};
</script>
