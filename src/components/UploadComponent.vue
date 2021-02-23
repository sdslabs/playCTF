<template>
  <div class="uploadRow">
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
        <div class="uploadText">
          {{
            this.logo || this.showInitialImg ? "Replace file" : "Upload file"
          }}
        </div></label
      >
    </div>
    <div v-if="logo" class="filename">
      {{ logo.name }}
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
      showInitialImg: true,
    };
  },
  methods: {
    removeLogo() {
      document.getElementById("actual-button").value = "";
      this.showImg = false;
      document.getElementById("preview").src = null;
      this.logo = null;
    },
    previewImg() {
      if (!this.logo) {
        return;
      }
      this.showImg = true;
      let reader = new FileReader();
      reader.readAsDataURL(this.logo);
      reader.onload = function (readerEvent) {
        document.getElementById("preview").src = readerEvent.target.result;
      };
    },
    emitLogo(compInfoLogo) {
      this.$emit("changed", compInfoLogo);
    },
    onFileChange() {
      this.showInitialImg = false;
      this.logo = this.$refs.file.files[0];
      this.previewImg();
    },
  },
  watch: {
    logo: function (newCompInfoLogo, prevCompInfoLogo) {
      if (newCompInfoLogo != prevCompInfoLogo) {
        this.emitLogo(newCompInfoLogo);
      }
    },
    // uploadFile: function (changedValue) {
    //   this.logo = changedValue;
    // },
  },
};
</script>
