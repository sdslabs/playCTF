<template>
  <div
    v-if="this.challDetails"
    class="challCard"
    :class="{ 'preview-challcard': isPreview }"
  >
    <div class="challCard-firstLine">
      <div class="challCard-challName">{{ challDetails.name }}</div>
      <div v-if="challDetails.isSolved" class="chall-submitted">
        <span>Submitted</span>
        <img src="@/assets/tick.svg" />
      </div>
    </div>
    <div class="challCard-solves">
      {{ challDetails.points }} Points
      <span v-if="challDetails && challDetails.solves"
        >| {{ challDetails.solves.length }} Solves</span
      >
    </div>
    <div class="challCard-tag-container">
      <span v-for="tag in challDetails.tags" :key="tag" class="challCard-tag">
        {{ tag }}
      </span>
    </div>
    <div class="challCard-challDesc">{{ challDetails.description }}</div>
    <div class="challCard-resources">
      <div
        v-for="port in this.challDetails.ports"
        :key="port"
        class="host aboutText"
      >
        <a
          class="challenge-link"
          :href="getUrl(port)"
          target="_blank"
          v-if="link"
        >
          {{ getUrl(port) }}
        </a>
        <p class="challenge-link-code" :href="getUrl(port)" v-else>
          {{ getUrl(port) }}
        </p>
      </div>
      <div class="challenge-links">
        <p class="link-heading">Asset Links</p>
        <a
          class="challenge-link aboutText"
          v-for="asset in this.challDetails.assets"
          :href="getStaticUrl(asset)"
          target="_blank"
          :key="asset"
        >
          {{ getFileFromAsset(asset) }}
        </a>
        <p class="link-heading">Additional Links</p>
        <a
          class="challenge-link"
          v-for="asset in this.challDetails.additionalLinks"
          :href="asset"
          target="_blank"
          :key="asset"
        >
          {{ asset }}
        </a>
      </div>
    </div>
    <div
      v-if="!challDetails.isSolved && !isPreview"
      class="challCard-bottom-row"
    >
      <div class="challCard-form">
        <input
          type="text"
          name="flag"
          class="challCard-form-input"
          id="flag-input"
          placeholder="Start typing flag here..."
          v-model="flag"
        />
        <Button
          text="Submit Flag"
          variant="secondary-cta challCard-submit-buttom"
          :disabled="flag.length === 0 || this.showSuccess || this.showFail"
          :onclick="submitFlag"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FlagService from "../api/userAPI";
import Button from "@/components/Button.vue";
import { CONFIG } from "@/config/config";
export default {
  name: "ChallCard",
  props: ["challDetails", "tag", "isPreview"],
  components: { Button },
  data() {
    return {
      flag: "",
      showSuccess: false,
      showFail: false,
      link: false
    };
  },
  state: {
    disable: false,
    isModalVisible: false
  },
  methods: {
    getUrl(port) {
      let url = CONFIG.webRoot;
      let ncurl = CONFIG.ncRoot;
      if (
        this.challDetails.category === "service" ||
        this.challDetails.category === "xinetd"
      ) {
        return `nc ${ncurl} ${port}`;
      }
      return `${CONFIG.webRoot}:${port}`;
    },
    getStaticUrl(asset) {
      let url = CONFIG.staticRoot;
      return `${url}${asset}`;
    },
    getFileFromAsset(asset) {
      let paths = asset.split("/");
      return paths[paths.length - 1];
    },
    submitFlag() {
      FlagService.submitFlag(this.challDetails.id, this.flag).then(Response => {
        this.$vToastify.setSettings({ position: "center-right" });
        if (Response.data.success) {
          this.showSuccess = true;
          this.$vToastify.success("Flag submitted successfully", "Success");
        } else {
          this.showFail = true;
          this.$vToastify.error("Incorrect flag submitted", "Error");
        }
      });
      var self = this;
      setTimeout(function() {
        if (self.showSuccess) {
          self.$router.go();
        } else {
          self.$emit("updateChallenges");
        }
        self.flag = "";
        self.showSuccess = false;
        self.showFail = false;
      }, 3000);
    },
    isDisabled: function() {
      let flag = document.getElementById("flag-input").value;
      if (flag != "") {
        this.disable = true;
      } else {
        this.disable = false;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  watch: {
    challDetails() {
      this.flag = "";
    }
  },
  mounted() {
    if (
      this.challDetails.category === "service" ||
      this.challDetails.category === "xinetd"
    )
      this.link = false;
    else this.link = true;
  }
};
</script>
