<template>
  <div class="create-chall-modal">
    <div class="create-chall-modal-header">
      <div class="heading">CREATE NEW CHALLENGE</div>
      <button class="modal-close-button close-cross" @click="$emit('close')">
        <img :src="cross" />
      </button>
    </div>
    <div class="flex-row-center">
      <UploadComponent
        :previewImage="false"
        @changed="setChallengeTar"
        :uploadFile="challengeTar"
      ></UploadComponent>
      <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
    </div>
    <ErrorBox
      v-if="submitMsg"
      :msg="submitMsg"
      :icon="icon"
      class="received-error"
    />
    <div v-if="this.challengeInfo.name" class="margin-bottom-2">
      <ChallCard
        :challDetails="this.challengeInfo"
        :tag="this.challengeInfo.category"
        :isPreview="true"
      />
    </div>
    <Button
      text="Upload Challenge"
      v-if="!challCreated"
      :disabled="!challengeTar"
      class="uploadChallButton"
      variant="primary-cta"
      :onclick="updateConfigs"
    />
    <div v-if="challCreated" class="createChallBtnRow">
      <Button
        text="Create and Deploy"
        class="primary-cta"
        :onclick="deployChall"
      />
    </div>
  </div>
</template>

<script>
import { cross } from "../constants/images";
import challengesService from "../api/admin/challengesAPI";
import UploadComponent from "@/components/UploadComponent.vue";
import ChallCard from "@/components/ChallCard.vue";
import Button from "@/components/Button.vue";
import ErrorBox from "@/components/ErrorBox.vue";
export default {
  name: "PreviewModal",
  data() {
    return {
      cross,
      challengeTar: "",
      challengeInfo: {},
      challCreated: false,
      submitted: null,
      submitMsg: null,
      msg: null,
      icon: null
    };
  },
  components: {
    UploadComponent,
    ChallCard,
    Button,
    ErrorBox
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async fadeFunc() {
      await this.sleep(5000);
      this.submitMsg = null;
      this.msg = null;
      this.icon = null;
    },
    setChallengeTar(val) {
      if (val === "invalidFile") {
        this.msg = "Not a valid challenge file";
        this.icon = "error-white";
        this.fadeFunc();
      } else {
        this.challengeTar = val;
      }
    },
    async updateConfigs() {
      await challengesService
        .createChallenge(this.challengeTar)
        .then(res => {
          this.challengeInfo = res;
          this.challCreated = true;
        })
        .catch(e => {
          this.submitMsg = e.response.data.error;
          this.icon = "error-white";
          this.fadeFunc();
          this.showFail = true;
          this.challCreated = false;
        });
    },
    async deployChall() {
      challengesService
        .manageChalAction(this.challengeInfo.name, "deploy")
        .then(async response => {
          this.$emit("close");
          this.$router.push(`/admin/challenges/${this.challengeInfo.name}`);
        });
    }
  },
  watch: {
    challengeTar: function(challTarValue) {
      if (challTarValue === null) {
        this.challengeTar = "";
        this.challengeInfo = {};
        this.challCreated = false;
      }
    }
  }
};
</script>
