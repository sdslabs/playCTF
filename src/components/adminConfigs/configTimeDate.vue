<template>
  <div>
    <p class="subfields">Time Zone</p>
    <v-select
      :options="this.getAllTimezones()"
      :value="timedate.timezone"
      @input="setTimezone"
      :clearable="false"
      :class="['timezoneSelect', { 'v-select-disabled': this.disabled }]"
    />
    <div class="time">
      <div class="timeSub">
        <div class="dateInput">
          <p class="subfields">Start date</p>
          <input
            v-model="timedate.startDate"
            class="title"
            type="date"
            :disabled="this.disabled"
          />
        </div>
        <div class="timeInput">
          <p class="subfields">Start time (24 hr format)</p>
          <input
            v-model="timedate.startTime"
            class="title"
            type="time"
            step="1"
            :disabled="this.disabled"
          />
        </div>
      </div>
      <div class="timeSub">
        <div class="dateInput">
          <p class="subfields">End date</p>
          <input
            v-model="timedate.endDate"
            class="title"
            type="date"
            :disabled="this.disabled"
          />
        </div>
        <div class="timeInput">
          <p class="subfields">End time (24 hr format)</p>
          <input
            v-model="timedate.endTime"
            class="title"
            type="time"
            step="1"
            :disabled="this.disabled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllTimezones } from "../../constants/constants";
export default {
  name: "ConfigTimeDate",
  props: ["compTimeDate", "disabled"],
  data() {
    return {
      timedate: this.compTimeDate,
      getAllTimezones
    };
  },
  methods: {
    emitTimeDate(compInfoDateTime) {
      this.$emit("changed", compInfoDateTime);
    },
    setTimezone(value) {
      this.timedate.timezone = value;
    }
  },
  watch: {
    timedate: {
      handler: function(newCompInfoDateTime) {
        this.emitTimeDate(newCompInfoDateTime);
      },
      deep: true
    },
    compTimeDate: {
      handler(newCompInfoDateTime) {
        this.timedate = newCompInfoDateTime;
      }
    }
  }
};
</script>
