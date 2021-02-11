<template>
  <div class="logoUpload">
    <input
      type="file"
      id="actual-button"
      ref="file"
      v-on:change="onFileChange()"
      hidden
    />
    <label for="actual-button">
      <img :src="upload" />
      <div class="uploadText">Upload file</div></label
    >
  </div>
</template>

<script>
import { upload } from "../../constants/images";
export default {
  name: "ConfigLogo",
  props: ["compLogo"],
  data() {
    return {
      logo: "",
      upload
    };
  },
  methods: {
    emitLogo(val) {
      this.$emit("changed", val);
    },
    onFileChange() {
      this.logo = this.$refs.file.files[0];
    }
  },
  watch: {
    logo: function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.emitLogo(newVal);
      }
    }
    // compLogo: function (newval) {
    //   this.logo = newval;
    // },
  }
};
</script>
