<template>
  <div class="adminConfigureContainer">
    <div class="heading">
      <span class="headingText"> CONFIGURE</span>
      <div class="configureButtons">
        <button class="action-cta" @click="showPreviewModal = true">
          <img :src="preview" />
          <span>Preview</span>
        </button>

        <button class="action-cta" @click="sendRestartRequest">
          <span>Restart</span>
        </button>

        <button class="action-cta" onclick="window.open('/logs')">
          <span>Logs</span>
        </button>
      </div>

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
      <p class="subfields">Competition logo (in image format)</p>
      <!-- eslint-disable-next-line -->
      <ConfigLogo @changed="setCompLogo" :compLogo="compLogo"></ConfigLogo>
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
import { CONFIG } from "@/config/config";
import axiosInstance from "../api/axiosInstance.js";
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
        "DD MMMM YYYY, dddd"
      )}`;
      let endingTime = `${endingTimeObj.format("HH:mm:ss")} UTC: ${moment
        .tz(timezone)
        .format("Z")}, ${endingTimeObj.format("DD MMMM YYYY, dddd")}`;
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
          if (configs.logo) {
            configs.logo = configs.logo.name;
          } else {
            configs.logo = "";
          }
          this.$store.commit("updateCompInfo", configs);
          this.$vToastify.setSettings({
            theme: "beast-success",
          });
          this.$vToastify.success("Changes made successfully", "Success");
          this.fadeFunc();
        })
        .catch(() => {
          this.$vToastify.setSettings({
            theme: "beast-error",
          });
          this.$vToastify.error("Failed to make changes", "Error");
          this.fadeFunc();
        });
    },
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
    closeModal() {
      this.showPreviewModal = false;
    },
    sendRestartRequest() {
      fetch("/restart/");
      this.$vToastify.setSettings({
        theme: "beast-success",
      });
      this.$vToastify.success("Restart requested!", "Success");
      this.fadeFunc();
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
      let logoName = configs.logo_url;
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
      if (logoName) {
        configureService
          .getLogo(`${CONFIG.beastRoot}/api/info/logo/${logoName}`, logoName)
          .then((response) => {
            this.compLogo = response;
          });
      } else {
        this.compLogo = null;
      }
    });
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "adminConfigure");
  },
};
</script>
