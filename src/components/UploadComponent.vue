<template>
  <div class="uploadRow margin-vert-1">
    <div class="logoUpload">
      <input
        type="file"
        id="challFileInput"
        ref="file"
        v-on:change="onFileChange()"
        hidden
      />
      <label for="challFileInput">
        <img :src="upload" />
        <div class="uploadText">
          {{ this.logo ? "Replace file" : "Upload file" }}
        </div></label
      >
    </div>
    <div v-if="logo" class="filename">
      {{ name }}
      <div @click="removeLogo()"><img src="@/assets/cross.svg" /></div>
    </div>
  </div>
</template>

<script>
import { upload } from "../constants/images";
import { CONFIG } from "@/config/config";
export default {
  name: "UploadComponent",
  props: ["uploadFile, previewImage"],
  data() {
    return {
      baseUrl: CONFIG.beastRoot,
      logo: null,
      upload,
      showImg: false,
      name: "",
    };
  },
  methods: {
    removeLogo() {
      this.showImg = false;
      this.logo = null;
      document.getElementById("challFileInput").value = "";
    },
    emitLogo(compInfoLogo) {
      this.$emit("changed", compInfoLogo);
    },
    onFileChange() {
      this.logo = this.$refs.file.files[0];
      this.name = this.logo.name.trim().substr(0, 10) + "...";
      console.log(this.logo);
    },
  },
  watch: {
    logo: function (newCompInfoLogo, prevCompInfoLogo) {
      if (newCompInfoLogo != prevCompInfoLogo) {
        this.emitLogo(newCompInfoLogo);
      }
    },
  },
};
</script>
