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
    </div>
    <div class="form">
      <p class="fields">
        Competition Name<span class="importantField">*</span>
      </p>
      <input
        v-model="title"
        placeholder="Enter the name of competition to be displayed"
        class="title"
      />
      <p class="fields">Content</p>
      <p class="subfields">About<span class="importantField">*</span></p>
      <textarea
        v-model="description"
        placeholder="Enter the information to be displayed regarding competition"
      ></textarea>
      <p class="subfields">Prizes<span class="importantField">*</span></p>
      <textarea
        v-model="description"
        placeholder="Enter the information to be displayed regarding prizes"
      ></textarea>
      <p class="fields">
        Date and Time Settings <span class="importantField">*</span>
      </p>
      <p class="subfields">Time Zone</p>
      <v-select
        :options="this.getAllTimezones()"
        :value="this.currentTimezone"
        @input="setTimezone"
        :clearable="false"
        class="timezoneSelect"
      />
      <div class="time">
        <div class="timeSub">
          <div>
            <p class="subfields">Start date</p>
            <input v-model="title" class="title" type="date" />
          </div>
          <div>
            <p class="subfields">Start time (24 hr format)</p>
            <input v-model="title" class="title" type="time" />
          </div>
        </div>
        <div class="timeSub">
          <div>
            <p class="subfields">End date</p>
            <input v-model="title" class="title" type="date" />
          </div>
          <div>
            <p class="subfields">End time (24 hr format)</p>
            <input v-model="title" class="title" type="time" />
          </div>
        </div>
      </div>
      <p class="subfields">Competition logo</p>
      <!-- eslint-disable-next-line -->
      <div class="logoUpload">
        <input type="file" id="actual-button" hidden />
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
      <button class="submitButton">Submit</button>
    </div>
  </div>
</template>
<script>
import { preview, upload } from "../constants/images";
import moment from "moment-timezone";
export default {
  name: "AdminConfigure",
  data() {
    return {
      preview,
      upload,
      currentTimezone: `${moment.tz.guess()}: UTC ${moment.tz(moment.tz.guess()).format('Z')}`,
    };
  },
  methods: {
    getAllTimezones() {
      let timezones =  moment.tz.names();
      let formattedTimezones = []
      timezones.forEach(el=>{
        formattedTimezones.push(`${el}: UTC ${moment.tz(el).format('Z')}`)
      })
      return formattedTimezones
    },
    setTimezone(value) {
      this.currentTimezone = value;
    },
  },
  mounted() {
    console.log(moment.tz.names());
  },
};
</script>
