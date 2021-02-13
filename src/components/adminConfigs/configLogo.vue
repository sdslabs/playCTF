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
    emitLogo(compInfoLogo) {
      this.$emit("changed", compInfoLogo);
    },
    onFileChange() {
      this.logo = this.$refs.file.files[0];
    }
  },
  watch: {
    logo: function(newCompInfoLogo, prevCompInfoLogo) {
      if (newCompInfoLogo != prevCompInfoLogo) {
        this.emitLogo(newCompInfoLogo);
      }
    }
    // compLogo: function (changedValue) {
    //   this.logo = changedValue;
    // },
  }
};
</script>
