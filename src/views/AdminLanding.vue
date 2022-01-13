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
            <button
              class="action-cta preview-button"
              @click="showPreviewModal = true"
              v-if="getCurrentStep() === 5"
            >
              <img :src="preview" />
              <span> Preview</span>
            </button>
          </div>
          <div v-if="totalSteps === getCurrentStep()" class="action">
            <button
              v-if="getCurrentStep() !== 1"
              class="action-cta"
              @click="goBack"
            >
              Back
            </button>
            <button class="secondary-cta ml-1" @click="submitConfigs">
              Proceed
            </button>
          </div>
          <div v-else class="action">
            <button
              v-if="getCurrentStep() !== 1"
              class="action-cta"
              @click="goBack"
            >
              Back
            </button>
            <button
              class="secondary-cta ml-1"
              @click="goNext"
              :disabled="isNextDisabled()"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </transition-group>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showPreviewModal">
        <preview-modal
          :configs="getConfigs()"
          :fetchedData="true"
          @close="showPreviewModal = false"
        />
      </div>
    </transition>
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
import PreviewModal from "../components/PreviewModal.vue";
import { CONFIG } from "@/config/config";
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
      preview,
      showPreviewModal: false
    };
  },
  components: {
    AdminLandingProgress,
    ConfigTitle,
    ConfigContent,
    ConfigTimeDate,
    ConfigLogo,
    PreviewModal
  },
  async created() {
    await configureService.getConfigs().then(response => {
      let configs = response.data;
      this.compName = configs.name;
      this.compAbout = configs.about;
      this.compPrizes = configs.prizes;
      let startingTime = configs.starting_time;
      let endingTime = configs.ending_time;
      let logoName = configs.logo_url;
      if (logoName) {
        configureService
          .getLogo(`${CONFIG.beastRoot}/api/info/logo/${logoName}`, logoName)
          .then(response => {
            this.compLogo = response;
          });
      } else {
        this.compLogo = null;
      }
      let startDetails = startingTime.split(",");
      let endingDetails = endingTime.split(",");
      this.compStartTime = moment(
        startDetails[0].split(" ")[0],
        "HH:mm:ss"
      ).format("HH:mm:ss");
      this.compStartDate = moment(startDetails[1], " DD MMMM YYYY").format(
        "yyyy-MM-DD"
      );
      this.compEndTime = moment(
        endingDetails[0].split(" ")[0],
        "HH:mm:ss"
      ).format("HH:mm:ss");
      this.compEndDate = moment(endingDetails[1], " DD MMMM YYYY").format(
        "yyyy-MM-DD"
      );
      this.compTimezone =
        configs.timezone ||
        `${moment.tz.guess()}: UTC ${moment.tz(moment.tz.guess()).format("Z")}`;
    });
    this.currentStep = this.getStartingStep();
    if (this.currentStep > 3) {
      this.$router.push("/admin/statistics");
    }
  },
  methods: {
    getConfigs() {
      return {
        name: this.compName,
        about: this.compAbout,
        prizes: this.compPrizes,
        starting_time: this.getDateTimeString().startingTime,
        ending_time: this.getDateTimeString().endingTime,
        timezone: this.compTimezone,
        logo: this.compLogo
      };
    },
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
    closeModal() {
      this.showPreviewModal = false;
    },
    submitConfigs() {
      let startEndTime = this.getDateTimeString();
      let startingTime = startEndTime.startingTime;
      let endingTime = startEndTime.endingTime;
      let configs = {
        name: this.compName,
        about: this.compAbout,
        prizes: this.compPrizes,
        startingTime,
        endingTime,
        timezone: this.compTimezone,
        logo: this.compLogo
      };
      configureService
        .updateConfigs(configs)
        .then(() => {
          this.showSuccess = true;
          if (configs.logo) {
            configs.logo = configs.logo.name;
          } else {
            configs.logo = "";
          }
          this.$store.commit("updateCompInfo", configs);
          this.$router.push("/admin/statistics");
        })
        .catch(() => {
          this.showFail = true;
        });
    },
    getDateTimeString() {
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
        "DD MMMM YYYY, dddd"
      )}`;
      let endingTime = `${endingTimeObj.format("HH:mm:ss")} UTC: ${moment
        .tz(timezone)
        .format("Z")}, ${endingTimeObj.format("DD MMMM YYYY, dddd")}`;
      return {
        startingTime,
        endingTime
      };
    }
  }
};
</script>
