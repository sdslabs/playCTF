<template>
  <div
    class="adminNavDropdown"
    @mouseover="showDropdownContent(true)"
    @mouseleave="showDropdownContent(false)"
  >
    <button class="adminNavDropbtn">
      Admin
      <img :src="dropdown" />
    </button>
    <div v-if="displayDropdownContent" class="adminNavDropdownContent">
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
      dropdown,
      displayDropdownContent: false
    };
  },
  methods: {
    logout() {
      store.commit("logout");
      this.$router.push("/login");
    },
    showDropdownContent(showContent) {
      this.displayDropdownContent = showContent;
    }
  }
};
</script>
