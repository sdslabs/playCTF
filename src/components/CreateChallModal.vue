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
export default {
  name: "PreviewModal",
  data() {
    return { cross, challengeTar: "", challengeInfo: {}, challCreated: false };
  },
  components: {
    UploadComponent,
    ChallCard,
    Button
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
