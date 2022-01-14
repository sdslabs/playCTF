<template>
  <div class="edit-chall-modal">
    <div class="edit-chall-modal-header">
      <div class="heading">EDIT CHALLENGE</div>
      <button class="modal-close-button close-cross" @click="$emit('close')">
        <img :src="cross" />
      </button>
    </div>
    <div class="edit-chall-modal-body form">
      <p class="adFormFields">Name</p>
      <input v-model="name" class="adminFormTitle readonly" readonly />
      <p class="adFormFields">Flag</p>
      <input
        v-model="flag"
        placeholder="Enter the Flag"
        class="adminFormTitle"
      />
      <p class="adFormFields">Hints</p>
      <textarea
        v-model="hints"
        placeholder="Enter the Hints to be displayed "
      ></textarea>
      <p class="adFormFields">Description</p>
      <textarea
        v-model="description"
        placeholder="Enter the description"
      ></textarea>
      <p class="adFormFields">Tags</p>
      <input
        v-model="tags"
        placeholder="Enter the Tags"
        class="adminFormTitle"
      />
      <p class="editFormFieldNote">
        Use four colons (::::) to separate multiple values
      </p>
      <div class="editChallModalFormGroup">
        <div class="editChallModalInputGroup width65">
          <p class="adFormFields">Ports</p>
          <input
            v-model="ports"
            placeholder="Enter the ports"
            class="adminFormTitle"
          />
          <p class="editFormFieldNote">
            Use comma(,) to separate multiple values
          </p>
        </div>
        <div class="editChallModalInputGroup width30">
          <p class="adFormFields">Points</p>
          <input
            v-model="points"
            placeholder="Enter the points"
            class="adminFormTitle"
          />
        </div>
      </div>
      <p class="adFormFields">Asset Links</p>
      <ClickToAddList
        :list="assetLinks"
        @addNewItem="addNewAsset"
        @deleteItem="deleteAsset"
        @valueChanged="assetChanged"
      />
      <p class="adFormFields">Additional Links</p>
      <ClickToAddList
        :list="additionalLinks"
        @addNewItem="addNewAdditionalLink"
        @deleteItem="deleteAdditionalLink"
        @valueChanged="additionalLinkChanged"
      />
    </div>
    <div class="actionButtons">
      <button
        class="action-cta challenge-action-btn discard-button"
        @click="$emit('close')"
      >
        Discard
      </button>
      <Button
        text="Save Changes"
        variant="primary-cta"
        :onclick="updateConfigs"
      />
    </div>
  </div>
</template>

<script>
import { cross } from "../constants/images";
import configService from "../api/admin/configureAPI";
import UploadComponent from "@/components/UploadComponent.vue";
import ChallCard from "@/components/ChallCard.vue";
import Button from "@/components/Button.vue";
import ErrorBox from "@/components/ErrorBox.vue";
import ClickToAddList from "@/components/ClickToAddList.vue";
export default {
  name: "PreviewModal",
  props: ["challenge"],
  data() {
    return {
      cross,
      assetLinks: [],
      additionalLinks: [],
      challengeInfo: {},
    };
  },
  components: {
    Button,
    ClickToAddList,
  },
  mounted() {
    console.log(this.challenge)
    this.challengeInfo = Object.assign({}, this.challenge);
    this.updateChallengeInfo();
  },
  methods: {
    async updateConfigs() {
      await configService
        .updateChallengeConfig({
          name: this.name,
          flag: this.flag,
          hints: this.hints,
          description: this.description,
          tags: this.tags,
          ports: this.ports,
          points: this.points,
          assetLinks: this.assetLinks.filter((e) => e),
          additionalLinks: this.additionalLinks.filter((e) => e),
        })
        .then((res) => {
          this.$emit("close");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewAsset() {
      this.assetLinks.push("");
    },
    deleteAsset(index) {
      this.assetLinks.splice(index, 1);
    },
    assetChanged(value, index) {
      this.assetLinks[index] = value;
    },
    addNewAdditionalLink() {
      this.additionalLinks.push("");
    },
    deleteAdditionalLink(index) {
      this.additionalLinks.splice(index, 1);
    },
    additionalLinkChanged(value, index) {
      this.additionalLinks[index] = value;
    },
    updateChallengeInfo() {
      this.name = this.challengeInfo.name;
      this.flag = this.challengeInfo.flag;
      this.hints = this.challengeInfo.hints;
      this.description = this.challengeInfo.description;
      this.tags = this.challengeInfo.tags.join("::::");
      this.ports = this.challengeInfo.ports.join();
      this.points = this.challengeInfo.points;
      this.assetLinks =
        this.challengeInfo.assets[0] === "" ? [] : this.challengeInfo.assets;
      this.additionalLinks =
        this.challengeInfo.additionalLinks[0] === ""
          ? []
          : this.challengeInfo.additionalLinks;
    },
  },
};
</script>
