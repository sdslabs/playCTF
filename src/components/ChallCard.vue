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
      <span v-if="challDetails">| {{ challDetails.solves.length }} Solves</span>
    </div>
    <div class="challCard-challDesc">{{ challDetails.description }}</div>
    <div class="challCard-resources">
      <a
        v-for="port in this.challDetails.ports"
        :key="port"
        :href="`${hostUrl}:${port}`"
        ><div class="challCard-challLink">
          {{ `${hostUrl}:${port}` }}
        </div>
      </a>
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
          variant="primary-cta"
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
export default {
  name: "ChallCard",
  props: ["challDetails", "tag", "isPreview"],
  components: { Button },
  data() {
    return {
      flag: "",
      showSuccess: false,
      showFail: false,
      hostUrl: this.$store.getters.hostUrl
    };
  },
  state: {
    disable: false,
    isModalVisible: false
  },
  methods: {
    enter: function() {
      setTimeout(function() {
        if (this.showSuccess) {
          this.$router.go();
        }
        this.showSuccess = false;
        this.showFail = false;
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
