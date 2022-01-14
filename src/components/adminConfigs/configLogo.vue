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
    <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
    <img v-if="this.logo" class="upload-preview" id="preview" />
  </div>
</template>

<script>
import { upload } from "../../constants/images";
import { CONFIG } from "@/config/config";
import ErrorBox from "../../components/ErrorBox";
export default {
  name: "ConfigLogo",
  props: ["compLogo"],
  data() {
    return {
      msg: null,
      icon: null,
      baseUrl: CONFIG.beastRoot,
      logo: this.compLogo,
      upload,
      acceptedImageExtensions: ["jpg", "jpeg", "png", "svg"]
    };
  },
  components: {
    ErrorBox
  },
  created() {
    if (this.logo) {
      this.previewImg();
    }
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async fadeFunc() {
      await this.sleep(3000);
      this.msg = null;
      this.icon = null;
    },
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
          this.logo = prevCompInfoLogo;
          this.$vToastify.error("Not a valid image file", "Error");
          this.fadeFunc();
        }
      }
    },
    compLogo: function(changedValue) {
      this.logo = changedValue;
    }
  }
};
</script>
