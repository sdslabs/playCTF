<template>
  <div class="uploadRow">
    <input
      type="file"
      id="actual-button"
      ref="file"
      v-on:change="onFileChange()"
      hidden
    />
    <label for="actual-button" class="upload-button">
      <img :src="upload" />
      <div class="uploadText">
        {{ this.logo ? "Replace file" : "Upload file" }}
      </div></label
    >
    <div v-if="logo" class="filename">
      {{ logo.name }}
      <div @click="removeLogo()">
        <img class="close-cross" src="@/assets/cross.svg" />
      </div>
    </div>
    <img v-if="this.logo" class="upload-preview" id="preview" />
  </div>
</template>

<script>
import { upload } from "../../constants/images";
import { CONFIG } from "@/config/config";
export default {
  name: "ConfigLogo",
  props: ["compLogo"],
  data() {
    return {
      baseUrl: CONFIG.beastRoot,
      logo: this.compLogo,
      upload,
      acceptedImageExtensions: ["jpg", "jpeg", "png", "svg"]
    };
  },
  created() {
    if (this.logo) {
      this.previewImg();
    }
  },
  methods: {
    removeLogo() {
      document.getElementById("actual-button").value = "";
      document.getElementById("preview").src = null;
      this.logo = null;
    },
    previewImg() {
      if (!this.logo) {
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(this.logo);
      reader.onload = function(readerEvent) {
        document.getElementById("preview").src = readerEvent.target.result;
      };
    },
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
        if (newCompInfoLogo === null) {
          this.previewImg();
          this.emitLogo(newCompInfoLogo);
        }
        let extension = newCompInfoLogo.name.split(".")[1];
        if (this.acceptedImageExtensions.includes(extension)) {
          this.previewImg();
          this.emitLogo(newCompInfoLogo);
        } else {
          console.log(prevCompInfoLogo);
          this.logo = prevCompInfoLogo;
          console.log("Not a valid image format");
        }
      }
    },
    compLogo: function(changedValue) {
      this.logo = changedValue;
    }
  }
};
</script>
