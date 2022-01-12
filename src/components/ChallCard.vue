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
    <div>
      <span v-for="tag in challDetails.tags" :key="tag" class="challCard-tag">
        {{ tag }}
      </span>
    </div>
    <div class="challCard-solves">
      {{ challDetails.points }} Points
      <span v-if="challDetails && challDetails.solves"
        >| {{ challDetails.solves.length }} Solves</span
      >
    </div>
    <div class="challCard-challDesc">{{ challDetails.description }}</div>
    <div class="challCard-resources">
      <div
        v-for="port in this.challDetails.ports"
        :key="port"
        class="host aboutText"
      >
        <a class="challenge-link" :href="getUrl(port)" target="_blank">
          {{ getUrl(port) }}
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
          variant="secondary-cta"
          :disabled="flag.length === 0 || this.showSuccess || this.showFail"
          :onclick="submitFlag"
        />
      </div>
    </div>
    <div class="submit-feedback">
      <transition name="fade" v-on:enter="enter">
        <img v-if="showSuccess" src="@/assets/submit-success.svg" />
        <img v-if="showFail" src="@/assets/submit-fail.svg" />
      </transition>
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
      showFail: false
    };
  },
  state: {
    disable: false,
    isModalVisible: false
  },
  methods: {
    getUrl(port) {
      let url = CONFIG.beastRoot;
      let portIndex = url.lastIndexOf(":");
      if (portIndex !== -1) {
        url = url.substring(0, portIndex);
      }
      return `${url}:${port}`;
    },
    enter: function() {
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
      }, 3000); // hide the message after 3 seconds
    },
    submitFlag() {
      FlagService.submitFlag(this.challDetails.id, this.flag).then(Response => {
        if (Response.data.success) {
          this.showSuccess = true;
        } else {
          this.showFail = true;
        }
      });
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
  }
};
</script>
