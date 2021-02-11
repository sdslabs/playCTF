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
        <div>
          <p class="subfields">Start date</p>
          <input
            v-model="timedate.startDate"
            class="title"
            type="date"
            :disabled="this.disabled"
          />
        </div>
        <div>
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
        <div>
          <p class="subfields">End date</p>
          <input
            v-model="timedate.endDate"
            class="title"
            type="date"
            :disabled="this.disabled"
          />
        </div>
        <div>
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
    emitTimeDate(val) {
      this.$emit("changed", val);
    },
    setTimezone(value) {
      this.timedate.timezone = value;
    }
  },
  watch: {
    timedate: {
      handler: function(newVal) {
        console.log(newVal);
        this.emitTimeDate(newVal);
      },
      deep: true
    },
    compTimeDate: {
      handler(newVal) {
        this.timedate = newVal;
      }
    }
  }
};
</script>
