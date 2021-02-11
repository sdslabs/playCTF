<template>
  <div class="adminLandingMainContainer">
    <div class="heading">
      <span class="orange"> WELCOME! </span>
      <span>LET'S START BUILDING YOUR COMPETITION</span>
    </div>
    <AdminLandingProgress
      :totalSteps="totalSteps"
      :currentStep="getCurrentStep()"
    />
    <div v-if="totalSteps === getCurrentStep()" class="action">
      <button v-if="getCurrentStep() !== 1" class="primary-btn" @click="goBack">
        Back
      </button>
      <button class="primary-btn action-btn" @click="submitConfig">
        Proceed
      </button>
    </div>
    <div v-else class="action">
      <button v-if="getCurrentStep() !== 1" class="primary-btn" @click="goBack">
        Back
      </button>
      <button class="primary-btn action-btn" @click="goNext">Next</button>
    </div>
  </div>
</template>

<script>
import AdminLandingProgress from "../components/AdminLandingProgress";
export default {
  data() {
    return {
      currentStep: 1,
      totalSteps: 5,
    };
  },
  components: {
    AdminLandingProgress,
  },
  methods: {
    getCurrentStep() {
      return this.currentStep;
    },
    goNext() {
      this.currentStep++;
    },
    goBack() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    submitConfig() {},
  },
};
</script>