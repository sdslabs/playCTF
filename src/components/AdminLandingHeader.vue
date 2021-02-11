<template>
  <div class="adminLandingHeader">
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
import { dropdown } from "../constants/images";
export default {
  name: "AdminLandingHeader",
  components: {},
  data() {
    return {
      dropdown
    };
  }
};
</script>
