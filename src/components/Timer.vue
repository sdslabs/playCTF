<template>
  <div>
    <div class="timer" v-show="statusType === 'running'">
      {{ days }}:{{ hours }}:{{ minutes }}:{{ seconds }}
    </div>
    <div class="timer" v-show="statusType !== 'running'">
      {{ statusType }}
    </div>
  </div>
</template>

<script>
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
    this.start = new Date(this.startTime).getTime();
    this.end = new Date(this.endTime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
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
