<template>
  <div>
    <div class="timer bold" v-if="days" v-show="statusType === 'running'">
      {{ days }}Day(s) {{ this.formatValue(hours) }}:{{
        this.formatValue(minutes)
      }}:{{ this.formatValue(seconds) }}
    </div>
    <div class="timer bold" v-else v-show="statusType === 'running'">
      {{ this.formatValue(hours) }}:{{ this.formatValue(minutes) }}:{{
        this.formatValue(seconds)
      }}
    </div>
    <div class="timer bold" v-show="statusType !== 'running'">
      {{ statusType }}
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone";
export default {
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
      statusType: ""
    };
  },
  mounted() {
    this.start = this.getDateTimeString(
      this.$store.state.competitionInfo.startingTime
    );
    this.end = this.getDateTimeString(
      this.$store.state.competitionInfo.endingTime
    );
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
      // console.log(start, end, distance, passTime);
      if (distance > 0) {
        this.statusType = "Upcoming";
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
        this.statusType = "running";
        this.calcTime(passTime);
      } else {
        this.statusType = "Expired";
        clearInterval(this.interval);
        return;
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
