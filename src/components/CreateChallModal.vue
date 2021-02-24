<template>
  <div class="create-chall-modal">
    <div class="create-chall-modal-header">
      <div class="heading">CREATE NEW CHALLENGE</div>
      <button class="modal-close-button" @click="$emit('close')">
        <img :src="cross" />
      </button>
    </div>
    <UploadComponent
      :previewImage="false"
      @changed="setChallengeTar"
      :uploadFile="challengeTar"
    ></UploadComponent>
    <div v-if="this.challengeInfo.name" class="margin-bottom-2">
      <ChallCard
        :challDetails="this.challengeInfo"
        :tag="this.challengeInfo.category"
        :isPreview="true"
      />
    </div>
    <button
      v-if="!challCreated"
      :disabled="!challengeTar"
      class="uploadChallengeButton primary-btn"
      @click="updateConfigs"
    >
      Upload Challenge
    </button>
    <div v-if="challCreated" class="createChallBtnRow">
      <button class="createChallButton primary-btn" @click="deployChall">
        Create and Deploy
      </button>
      <!--      <button class="createChallButton primary-btn" @click="deployChall">
        Create
      </button> -->
    </div>
  </div>
</template>

<script>
import { cross } from "../constants/images";
import challengesService from "../api/admin/challengesAPI";
import UploadComponent from "@/components/UploadComponent.vue";
import ChallCard from "@/components/ChallCard.vue";
export default {
  name: "PreviewModal",
  data() {
    return { cross, challengeTar: "", challengeInfo: {}, challCreated: false };
  },
  components: {
    UploadComponent,
    ChallCard
  },
  methods: {
    setChallengeTar(val) {
      this.challengeTar = val;
    },
    async updateConfigs() {
      await challengesService
        .createChallenge(this.challengeTar)
        .then(res => {
          this.challengeInfo = res;
          this.challCreated = true;
        })
        .catch(() => {
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
