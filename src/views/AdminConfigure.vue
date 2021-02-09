<template>
  <div class="adminConfigureContainer">
    <div class="heading">
      <span> CONFIGURE</span>

      <button class="preview-button">
        <div class="preview">
          <img :src="preview" />
          Landing Page
        </div>
      </button>
      <div class="addConfigFeedback">
        <transition name="fade" v-on:enter="enter">
          <img v-if="showSuccess" :src="configSuccess" />
          <img v-if="showFail" :src="configFail" />
        </transition>
      </div>
    </div>
    <div class="form">
      <p class="fields">
        Competition Name<span class="importantField">*</span>
      </p>
      <input
        v-model="compName"
        placeholder="Enter the name of competition to be displayed"
        class="title"
      />
      <p class="fields">Content</p>
      <p class="subfields">About<span class="importantField">*</span></p>
      <textarea
        v-model="compAbout"
        placeholder="Enter the information to be displayed regarding competition"
      ></textarea>
      <p class="subfields">Prizes<span class="importantField">*</span></p>
      <textarea
        v-model="compPrizes"
        placeholder="Enter the information to be displayed regarding prizes"
      ></textarea>
      <p class="fields">
        Date and Time Settings <span class="importantField">*</span>
      </p>
      <p class="subfields">Time Zone</p>
      <v-select
        :options="this.getAllTimezones()"
        :value="this.compTimezone"
        @input="setTimezone"
        :clearable="false"
        class="timezoneSelect"
      />
      <div class="time">
        <div class="timeSub">
          <div>
            <p class="subfields">Start date</p>
            <input v-model="compStartDate" class="title" type="date" />
          </div>
          <div>
            <p class="subfields">Start time (24 hr format)</p>
            <input v-model="compStartTime" class="title" type="time" />
          </div>
        </div>
        <div class="timeSub">
          <div>
            <p class="subfields">End date</p>
            <input v-model="compEndDate" class="title" type="date" />
          </div>
          <div>
            <p class="subfields">End time (24 hr format)</p>
            <input v-model="compEndTime" class="title" type="time" />
          </div>
        </div>
      </div>
      <p class="subfields">Competition logo (in .jpg format)</p>
      <!-- eslint-disable-next-line -->
      <div class="logoUpload">
        <input
          type="file"
          id="actual-button"
          ref="file"
          v-on:change="onFileChange()"
          hidden
        />
        <label for="actual-button">
          <img :src="upload" />
          <div class="uploadText">Upload file</div></label
        >
      </div>
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
        class="submitButton"
        :disabled="cannotUpdate()"
        @click="updateConfigs"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>
<script>
import { preview, upload } from "../constants/images";
import configureService from "../api/admin/configureAPI";
import moment from "moment-timezone";
import { configFail, configSuccess } from "../constants/images";
import store from '../api/loginToken.js';
import store from '../api/loginToken';
export default {
  name: "AdminConfigure",
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
      image: "",
      showSuccess: false,
      showFail: false
    };
  },
  created() {
    if (!store.getters.getState || !store.getters.getRights) {
      this.$router.push("/admin/statistics/");
    }
  },
  methods: {
    cannotUpdate() {
      let value = !(
        this.compName &&
        this.compAbout &&
        this.compPrizes &&
        this.compStartTime &&
        this.compStartDate &&
        this.compEndTime &&
        this.compEndDate
      );
      return value;
    },
    onFileChange() {
      this.image = this.$refs.file.files[0];
    },
    updateConfigs() {
      let timezone = moment.tz.names()[
        this.getAllTimezones().findIndex(el => {
          return el === this.compTimezone;
        })
      ];
      let startingTimeObj = moment(
        `${this.compStartDate}  ${this.compStartTime}`
      );
      let endingTimeObj = moment(`${this.compEndDate}  ${this.compEndTime}`);
      let startingTime = `${startingTimeObj.format("HH:mm")} UTC: ${moment
        .tz(timezone)
        .format("Z")}, ${startingTimeObj.format("Do MMMM YYYY, dddd")}`;
      let endingTime = `${endingTimeObj.format("HH:mm")} UTC: ${moment
        .tz(timezone)
        .format("Z")}, ${endingTimeObj.format("Do MMMM YYYY, dddd")}`;
      let configs = {
        name: this.compName,
        about: this.compAbout,
        prizes: this.compPrizes,
        startingTime,
        endingTime,
        timezone: this.compTimezone,
        logo: this.image
      };
      configureService
        .updateConfigs(configs)
        .then(() => {
          this.showSuccess = true;
        })
        .catch(() => {
          this.showFail = true;
        });
    },
    getAllTimezones() {
      let timezones = moment.tz.names();
      let formattedTimezones = [];
      timezones.forEach(el => {
        formattedTimezones.push(`${el}: UTC ${moment.tz(el).format("Z")}`);
      });
      return formattedTimezones;
    },
    setTimezone(value) {
      this.compTimezone = value;
    },
    enter: function() {
      let self = this;
      setTimeout(function() {
        self.showSuccess = false;
        self.showFail = false;
      }, 3000); // hide the message after 3 seconds
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
        "HH:mm"
      ).format("HH:mm");
      this.compStartDate = moment(startDetails[1], " Do MMMM YYYY").format(
        "yyyy-MM-DD"
      );
      this.compEndTime = moment(endingDetails[0].split(" ")[0], "HH:mm").format(
        "HH:mm"
      );
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
