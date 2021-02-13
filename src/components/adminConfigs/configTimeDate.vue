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
    emitTimeDate(value) {
      this.$emit("changed", value);
    },
    setTimezone(value) {
      this.timedate.timezone = value;
    }
  },
  watch: {
    timedate: {
      handler: function(changedValue) {
        console.log(changedValue);
        this.emitTimeDate(changedValue);
      },
      deep: true
    },
    compTimeDate: {
      handler(changedValue) {
        this.timedate = changedValue;
      }
    }
  }
};
</script>
