<template>
  <div class="uploadRow margin-vert-1">
    <input
      type="file"
      id="challFileInput"
      ref="file"
      v-on:change="onFileChange()"
      hidden
    />
    <label for="challFileInput" class="upload-button">
      <img :src="upload" />
      <div class="uploadText">
        {{ this.logo ? "Replace file" : "Upload file" }}
      </div></label
    >
    <div v-if="logo" class="filename">
      {{ name }}
      <div @click="removeLogo()" class="close-cross">
        <img src="@/assets/cross.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { upload } from "@/constants/images";
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
      acceptedChallengeExtensions: ["tar.gz", "tar", "zip"]
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
      if (this.logo.name.length > 18) {
        this.name = this.logo.name.trim().substr(0, 15) + "...";
      } else {
        this.name = this.logo.name;
      }
    }
  },
  watch: {
    logo: function(newCompInfoLogo, prevCompInfoLogo) {
      if (newCompInfoLogo != prevCompInfoLogo) {
        if (newCompInfoLogo === null) {
          this.emitLogo(newCompInfoLogo);
        }
        if (
          this.acceptedChallengeExtensions.includes(
            newCompInfoLogo.name.split(".")[1]
          )
        ) {
          this.emitLogo(newCompInfoLogo);
        } else {
          this.emitLogo("invalidFile");
          this.logo = prevCompInfoLogo;
        }
      }
    }
  }
};
</script>
