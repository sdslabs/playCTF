<template>
  <spin-loader v-if="isLoading" />
  <div class="pre-chall-container" v-else>
    <img class="hourglass-img" src="@/assets/hourglass.png" alt="hourglass" />
    <div class="pre-message">
      <p class="pre-message-text">Competition yet to start</p>
    </div>
    <div class="timer-sec" v-if="days">
      <div class="timer2-text">{{ days }}Day(s)</div>
      <div class="timer2-text">{{ this.formatValue(hours) }}:</div>
      <div class="timer2-text">{{ this.formatValue(minutes) }}:</div>
      <div class="timer2-text seconds-timezoneimer">
        {{ this.formatValue(seconds) }}
      </div>
    </div>
    <div class="timer-sec" v-else>
      <div class="timer2-text">{{ this.formatValue(hours) }}:</div>
      <div class="timer2-text">{{ this.formatValue(minutes) }}:</div>
      <div class="timer2-text seconds-timer">
        {{ this.formatValue(seconds) }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";
import SpinLoader from "../components/spinLoader.vue";
export default {
  components: { SpinLoader },
  name: "timer",
  data: function() {
    return {
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      statusType: "",
      startTime: this.$store.state.competitionInfo.startingTime,
      endTime: this.$store.state.competitionInfo.endingTime,
      isLoading: false
    };
  },
  mounted() {
    this.start = this.getDateTimeString(this.startTime);
    this.end = this.getDateTimeString(this.endTime);
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    getDateTimeString(time) {
      return moment(time, "HH:mm:ss UTC: Z, DD MMMM YYYY, dddd");
    },
    formatValue(timeElement) {
      if (timeElement < 10) {
        return "0" + timeElement.toString();
      }
      return timeElement;
    },
    timerCount: function(start, end) {
      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now an the count down date
      let distance = start - now;
      let passTime = end - now;

      if (distance < 0 && passTime < 0) {
        this.isLoading = true;
        this.$router.go();
        this.statusType = "Expired";
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.isLoading = true;
        this.$router.go();
        this.statusType = "running";
        this.calcTime(passTime);
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
        this.statusType = "Upcoming";
      }
    },
    calcTime: function(dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    }
  }
};
</script>
