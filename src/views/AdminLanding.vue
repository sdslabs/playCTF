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
          <div class="landingInput">
            <ConfigTitle
              v-if="getCurrentStep() === 1"
              @changed="setCompName"
              :compName="this.compName"
            />
            <ConfigContent
              v-if="getCurrentStep() === 3"
              :compContent="{ about: compAbout, prizes: compPrizes }"
              @changed="setCompContent"
            />
            <ConfigTimeDate
              v-if="getCurrentStep() === 2"
              @changed="setTimeDate"
              :compTimeDate="{
                timezone: compTimezone,
                startTime: compStartTime,
                startDate: compStartDate,
                endDate: compEndDate,
                endTime: compEndTime
              }"
              :disabled="false"
            />
            <ConfigLogo
              v-if="getCurrentStep() === 4"
              @changed="setCompLogo"
              :compLogo="compLogo"
            />
            <button class="preview-button" v-if="getCurrentStep() === 5">
              <div class="preview">
                <img :src="preview" />
                Preview
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition-group>
    <div v-if="totalSteps === getCurrentStep()" class="action">
      <button v-if="getCurrentStep() !== 1" class="primary-btn" @click="goBack">
        Back
      </button>
      <button class="primary-btn action-btn" @click="submitConfigs">
        Proceed
      </button>
    </div>
    <div v-else class="action">
      <button v-if="getCurrentStep() !== 1" class="primary-btn" @click="goBack">
        Back
      </button>
      <button
        class="primary-btn action-btn"
        @click="goNext"
        :disabled="isNextDisabled()"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import AdminLandingProgress from "../components/AdminLandingProgress";
import { AdminLandingDetails } from "../constants/constants";
import ConfigTitle from "../components/adminConfigs/configTitle.vue";
import ConfigContent from "../components/adminConfigs/configContent.vue";
import ConfigTimeDate from "../components/adminConfigs/configTimeDate.vue";
import ConfigLogo from "../components/adminConfigs/configLogo.vue";
import moment from "moment-timezone";
import { getAllTimezones } from "../constants/constants";
import configureService from "../api/admin/configureAPI";
import { preview } from "../constants/images";
export default {
  data() {
    return {
      currentStep: 1,
      totalSteps: 5,
      currentIndex: 0,
      AdminLandingDetails,
      back: false,
      compTimezone: "",
      compName: "",
      compAbout: "",
      compPrizes: "",
      compStartTime: "",
      compStartDate: "",
      compEndTime: "",
      compEndDate: "",
      compLogo: "",
      preview
    };
  },
  components: {
    AdminLandingProgress,
    ConfigTitle,
    ConfigContent,
    ConfigTimeDate,
    ConfigLogo
  },
  methods: {
    isNextDisabled() {
      let currentStep = this.getCurrentStep();
      if (currentStep === 1) {
        if (!this.compName) {
          return true;
        }
      }
      if (currentStep === 2) {
        if (
          !(
            this.compStartTime &&
            this.compStartDate &&
            this.compEndTime &&
            this.compEndDate &&
            this.compTimezone
          )
        ) {
          return true;
        }
      }
      if (currentStep === 3) {
        if (!this.compAbout) {
          return true;
        }
      }
      return false;
    },
    getStartingStep() {
      let page = 1;
      if (this.compName) {
        page = 2;
        if (
          this.compStartTime &&
          this.compStartDate &&
          this.compEndTime &&
          this.compEndDate
        ) {
          page = 3;
          if (this.compAbout && this.compPrizes) {
            page = 4;
            if (this.compLogo) {
              page = 5;
            }
          }
        }
      }
      return page;
    },
    setCompName(val) {
      this.compName = val;
    },
    setCompContent(val) {
      this.compAbout = val.about;
      this.compPrizes = val.prizes;
    },
    setTimeDate(val) {
      this.compStartDate = val.startDate;
      this.compStartTime = val.startTime;
      this.compEndDate = val.endDate;
      this.compEndTime = val.endTime;
      this.compTimezone = val.timezone;
    },
    setCompLogo(val) {
      this.compLogo = val;
    },
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
    submitConfigs() {
      let timezone = moment.tz.names()[
        getAllTimezones().findIndex(el => {
          return el === this.compTimezone;
        })
      ];
      let startingTimeObj = moment(
        `${this.compStartDate}  ${this.compStartTime}`
      );
      let endingTimeObj = moment(`${this.compEndDate}  ${this.compEndTime}`);
      let startingTime = `${startingTimeObj.format(
        "HH:mm:ss"
      )} UTC: ${moment.tz(timezone).format("Z")}, ${startingTimeObj.format(
        "Do MMMM YYYY, dddd"
      )}`;
      let endingTime = `${endingTimeObj.format("HH:mm:ss")} UTC: ${moment
        .tz(timezone)
        .format("Z")}, ${endingTimeObj.format("Do MMMM YYYY, dddd")}`;
      let configs = {
        name: this.compName,
        about: this.compAbout,
        prizes: this.compPrizes,
        startingTime,
        endingTime,
        timezone: this.compTimezone,
        logo: this.compLogo
      };
      configureService.updateConfigs(configs).then(() => {
        this.showSuccess = true;
        this.$router.push("/admin/statistics");
      });
    }
  },
  mounted() {
    configureService.getConfigs().then(response => {
      let configs = response.data;
      this.compName = configs.name;
      this.compAbout = configs.about;
      this.compPrizes = configs.prizes;
      let startingTime = configs.starting_time;
      let endingTime = configs.ending_time;
      let startDetails = startingTime.split(",");
      let endingDetails = endingTime.split(",");
      this.compStartTime = moment(
        startDetails[0].split(" ")[0],
        "HH:mm:ss"
      ).format("HH:mm:ss");
      this.compStartDate = moment(startDetails[1], " Do MMMM YYYY").format(
        "yyyy-MM-DD"
      );
      this.compEndTime = moment(
        endingDetails[0].split(" ")[0],
        "HH:mm:ss"
      ).format("HH:mm:ss");
      this.compEndDate = moment(endingDetails[1], " Do MMMM YYYY").format(
        "yyyy-MM-DD"
      );
      this.compTimezone =
        configs.timezone ||
        `${moment.tz.guess()}: UTC ${moment.tz(moment.tz.guess()).format("Z")}`;
    });
  }
};
</script>
