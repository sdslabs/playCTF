<template>
  <div class="pre-chall-container">
    <img class="hourglass-img" src="@/assets/hourglass.png" alt="hourglass" />
    <div class="pre-message">
      <p class="pre-message-text">Competition yet to start</p>
    </div>
    <div>
      <div class="timer2" v-if="days" v-show="statusType === 'Upcoming'">
        <div>{{ days }}Day(s)</div>
        <div>{{ this.formatValue(hours) }}:</div>
        <div>{{ this.formatValue(minutes) }}:</div>
        <div class="secondsTimer">{{ this.formatValue(seconds) }}</div>
      </div>
      <div class="timer2" v-else v-show="statusType === 'Upcoming'">
        <div>{{ this.formatValue(hours) }}:</div>
        <div>{{ this.formatValue(minutes) }}:</div>
        <div class="secondsTimer">{{ this.formatValue(seconds) }}</div>
      </div>
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
      statusType: "",
      startTime: this.$store.state.competitionInfo.startingTime,
      endTime: this.$store.state.competitionInfo.endingTime
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
        this.statusType = "Expired";
        clearInterval(this.interval);
        return;
      } else if (distance < 0 && passTime > 0) {
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

<style scoped>
.timer2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.timer2.div {
  font-size: 15rem;
}
.timer2.secondsTimer {
  color: #ff6700;
}
</style>
