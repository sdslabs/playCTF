<template>
  <div
    v-if="this.challDetails"
    class="challCard"
    :class="{ 'preview-challcard': isPreview }"
  >
    <div class="challCard-firstLine">
      <div class="challCard-challName">{{ challDetails.name }}</div>
      <div v-if="challDetails.category" class="challCard-tag">
        {{ challDetails.category }}
      </div>
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
    <div class="challCard-challDesc">{{ challDetails.description }}</div>
    <div class="challCard-resources">
      <div
        v-for="port in this.challDetails.ports"
        :key="port"
        class="host aboutText"
      >
        <div>
          <div class="challenge-link">
            {{ getUrl(port) }}
          </div>
        </div>
        <div
          v-for="asset in assetsForDockerWeb(challDetails, port)"
          :key="asset"
        >
          <a class="challenge-link" target="_blank" :href="asset">
            {{ asset }}
          </a>
        </div>
        <div v-for="asset in assets(challDetails, port)" :key="asset">
          <a class="challenge-link" target="_blank" :href="asset">
            {{ asset }}
          </a>
        </div>
      </div>
      <div v-if="this.challDetails.ports.length === 0" class="host aboutText">
        <div v-for="asset in assetsWithoutPort(challDetails)" :key="asset">
          <a class="challenge-link" target="_blank" :href="asset">
            {{ asset }}
          </a>
        </div>
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
          v-validate="'required'"
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
import _ from "lodash";
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
      ports: []
    };
  },
  state: {
    disable: false,
    isModalVisible: false
  },
  methods: {
    challUrl() {
      let url = CONFIG.beastRoot;
      let portIndex = url.lastIndexOf(":");
      if (portIndex !== -1) {
        url = url.substring(0, portIndex);
      }
      return url;
    },
    assets(challDetails, port) {
      let url = this.challUrl();
      let staticUrl = CONFIG.staticRoot;
      let assetsArr = [];
      if (_.isEmpty(challDetails.assets)) {
        return assetsArr;
      }
      const myArr = challDetails.assets.split("::::");
      if (
        this.challDetails.category === "service" ||
        this.challDetails.category === "xinetd"
      ) {
        for (let i = 0; i < myArr.length; i++) {
          assetsArr.push(`${staticUrl}/${challDetails.name}/${myArr[i]}`);
        }
      } else {
        for (let i = 0; i < myArr.length; i++) {
          assetsArr.push(`${url}:${port}/${myArr[i]}`);
        }
      }
      return assetsArr;
    },
    assetsWithoutPort(challDetails) {
      let url = this.challUrl();
      let staticUrl = CONFIG.staticRoot;
      let assetsArr = [];
      if (_.isEmpty(challDetails.assets)) {
        return assetsArr;
      }
      const myArr = challDetails.assets.split("::::");

      for (let i = 0; i < myArr.length; i++) {
        assetsArr.push(`${staticUrl}/${challDetails.name}/${myArr[i]}`);
      }
      return assetsArr;
    },
    assetsForDockerWeb(challDetails, port) {
      let url = CONFIG.ip;
      let assetsArr = [];
      if (
        _.isEmpty(challDetails.assets) ||
        challDetails.tag.toLowerCase() !== "web"
      ) {
        return assetsArr;
      }
      assetsArr.push(`${url}:${port}`);
      return assetsArr;
    },
    getUrl(port) {
      let ip = CONFIG.ip;
      let url = this.challUrl();
      if (
        this.challDetails.category === "service" ||
        this.challDetails.category === "xinetd"
      ) {
        return `nc ${ip} ${port}`;
      }
    },
    enter: function() {
      var self = this;
      setTimeout(function() {
        if (self.showSuccess) {
          self.$router.go();
        }
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
  }
};
</script>
