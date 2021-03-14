<template>
  <div class="adminConfigureContainer">
    <div class="heading">
      <span class="headingText"> CONFIGURE</span>

      <button class="action-cta" @click="showPreviewModal = true">
        <img :src="preview" />
        <span>Preview</span>
      </button>

      <div class="addConfigFeedback">
        <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
      </div>
    </div>
    <div class="form">
      <p class="fields">
        Competition Name<span class="importantField">*</span>
      </p>
      <ConfigTitle @changed="setCompName" :compName="this.compName" />
      <p class="fields">Content</p>
      <ConfigContent
        :compContent="{ about: compAbout, prizes: compPrizes }"
        @changed="setCompContent"
      ></ConfigContent>
      <p class="fields">
        Date and Time Settings <span class="importantField">*</span>
      </p>
      <ConfigTimeDate
        @changed="setTimeDate"
        :compTimeDate="{
          timezone: compTimezone,
          startTime: compStartTime,
          startDate: compStartDate,
          endDate: compEndDate,
          endTime: compEndTime,
        }"
        :disabled="true"
      ></ConfigTimeDate>
      <p class="subfields">Competition logo (in .jpg format)</p>
      <!-- eslint-disable-next-line -->
      <ConfigLogo @changed="setCompLogo" :compLogo="compLogo"></ConfigLogo>
      <!-- <p class="subfields">Themes</p>
      <div class="themes">
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Default</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Red</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Blue</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Dark</p>
        </div>
        <div class="sub-themes">
          <button class="block"></button>
          <p class="theme-name">Green</p>
        </div>
      </div> -->
      <button
        class="adminSubmitButton primary-cta"
        :disabled="cannotUpdate()"
        @click="updateConfigs"
      >
        Save Changes
      </button>
    </div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="showPreviewModal">
        <preview-modal @close="showPreviewModal = false" />
      </div>
    </transition>
  </div>
</template>
<script>
import { preview, upload } from "../constants/images";
import configureService from "../api/admin/configureAPI";
import moment from "moment-timezone";
import { configFail, configSuccess } from "../constants/images";
import ConfigTitle from "../components/adminConfigs/configTitle.vue";
import ConfigContent from "../components/adminConfigs/configContent.vue";
import ConfigTimeDate from "../components/adminConfigs/configTimeDate.vue";
import ConfigLogo from "../components/adminConfigs/configLogo.vue";
import { getAllTimezones } from "../constants/constants";
import PreviewModal from "../components/PreviewModal.vue";
import ErrorBox from "../components/ErrorBox";
export default {
  name: "AdminConfigure",
  components: {
    ConfigTitle,
    ConfigContent,
    ConfigTimeDate,
    ConfigLogo,
    PreviewModal,
    ErrorBox,
  },
  data() {
    return {
      configFail,
      configSuccess,
      preview,
      configs: {},
      upload,
      compTimezone: "",
      compName: "",
      compAbout: "",
      compPrizes: "",
      compStartTime: "",
      compStartDate: "",
      compEndTime: "",
      compEndDate: "",
      compLogo: "",
      showSuccess: false,
      showFail: false,
      showPreviewModal: false,
      msg: null,
      icon: null,
    };
  },
  methods: {
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
    cannotUpdate() {
      let value = !(
        this.compName &&
        this.compAbout &&
        this.compStartTime &&
        this.compStartDate &&
        this.compEndTime &&
        this.compEndDate
      );
      return value;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async fadeFunc() {
      await this.sleep(3000);
      this.msg = null;
      this.icon = null;
      this.showSuccess = false;
      this.showFail = false;
    },
    updateConfigs() {
      let timezone = moment.tz.names()[
        getAllTimezones().findIndex((el) => {
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
        logo: this.compLogo,
      };
      configureService
        .updateConfigs(configs)
        .then(() => {
          this.showSuccess = true;
          this.$store.commit("updateCompInfo", configs);
          this.msg = "Changes made successfully";
          this.icon = "tick-white";
          this.fadeFunc();
        })
        .catch(() => {
          this.showFail = true;
          this.msg = "Failed to make changes";
          this.icon = "error-white";
          this.fadeFunc();
        });
    },
    enter: function () {
      let self = this;
      setTimeout(function () {
        self.showSuccess = false;
        self.showFail = false;
      }, 3000); // hide the message after 3 seconds
    },
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
    closeModal() {
      this.showPreviewModal = false;
    },
  },
  mounted() {
    configureService.getConfigs().then((response) => {
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
      configureService.getLogo(configs.logo_url).then((response) => {
        if (response.status === 200) {
          this.compLogo = response.data;
        }
      });
    });
  },
};
</script>
