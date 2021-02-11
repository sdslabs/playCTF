<template>
  <div class="adminLandingMainContainer">
    <div class="heading">
      <span class="orange"> WELCOME! </span>
      <span>LET'S START BUILDING YOUR COMPETITION</span>
    </div>
    <AdminLandingProgress
      :totalSteps="totalSteps"
      :currentStep="getCurrentStep()"
    /><transition-group
      tag="div"
      class="div-slider"
      :name="back ? 'slideback' : 'slide'"
    >
      <div :key="getCurrentStep()">
        <div class="configValueComp">
          <div class="configHeading">
            <span class="orange">{{ getCurrentStep() }}. </span
            ><span>{{ AdminLandingDetails[getCurrentStep() - 1].title }}</span>
            <span
              v-if="AdminLandingDetails[getCurrentStep() - 1].required"
              class="importantField"
              >*</span
            >
          </div>
          <div class="configSubheading">
            {{ AdminLandingDetails[getCurrentStep() - 1].subtitle }}
          </div>
        </div>
      </div>
    </transition-group>
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
import { AdminLandingDetails } from "../constants/constants";
export default {
  data() {
    return {
      currentStep: 1,
      totalSteps: 5,
      currentIndex: 0,
      AdminLandingDetails,
      back: false
    };
  },
  components: {
    AdminLandingProgress
  },
  methods: {
    getCurrentStep() {
      return this.currentStep;
    },
    goNext() {
      this.back = false;
      this.currentStep++;
    },
    goBack() {
      if (this.currentStep > 1) {
        this.back = true;
        this.currentStep--;
      }
    },
    submitConfig() {}
  }
};
</script>
