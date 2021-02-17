<template>
  <div class="challCard">
    <div class="challCard-firstLine">
      <div class="challCard-challName">{{ challDetails.name }}</div>
      <div class="challCard-tag">{{ challDetails.category }}</div>
      <div v-if="challDetails.isSolved" class="chall-submitted">
        <span>Submitted</span>
        <img src="@/assets/tick.svg" />
      </div>
      <!--
      <div v-if="marked" class="challCard-bookmark" v-on:click="markedStatus()">
        <img src="@/assets/marked.svg" />
        <p class="challCard-review">Marked for review</p>
      </div>
      <div v-else class="challCard-bookmark" v-on:click="markedStatus()">
        <img src="@/assets/unmarked.svg" />
        <p class="challCard-review">Mark for review</p>
      </div>
      -->
    </div>
    <div class="challCard-solves">
      {{ challDetails.points }} Points | {{ challDetails.solves.length }} Solves
    </div>
    <div class="challCard-challDesc">{{ challDetails.description }}</div>
    <div class="challCard-resources">
      <div v-if="this.port" class="challCard-challPort">
        Port: {{ this.port }}
      </div>
      <a :href="`${this.$store.getters.challengeHostUrl}:${this.port || ''}`"
        ><div class="challCard-challLink">
          {{ `${this.$store.getters.challengeHostUrl}:${this.port || ""}` }}
        </div>
      </a>

      <!-- <a v-if="challItem" :href="challItem.link"
        ><div class="challCard-challItem">
          <img
            class="challCard-challItem-download"
            src="@/assets/download.svg"
          />
          {{ challItem.displayName }}
        </div>
      </a>-->
    </div>
    <div v-if="!challDetails.isSolved" class="challCard-bottom-row">
      <div class="challCard-form">
        <input
          type="text"
          name="flag"
          class="challCard-form-input"
          id="flag-input"
          placeholder="Start typing flag here..."
          v-validate="'required'"
          v-model="flag"
        />
        <button
          class="challCard-form-submit-button primary-btn"
          :disabled="flag.length === 0"
          @click="submitFlag"
        >
          Submit Flag
        </button>
      </div>
      <!--<div class="challCard-report" @click="showModal()">
        Report <img class="challCard-report-bug" src="@/assets/bug.svg" />
      </div>
      -->
    </div>
  </div>
</template>

<script>
import FlagService from "../api/userFlag";
export default {
  name: "ChallCard",
  props: ["challDetails", "tag"],
  data() {
    return {
      port: undefined,
      flag: ""
      // marked: false,
    };
  },
  state: {
    disable: false,
    // marked: false,
    isModalVisible: false
  },
  mounted() {
    if (this.challDetails.ports && this.challDetails.ports.length > 0) {
      this.port = this.challDetails.ports[0];
    }
  },
  methods: {
    submitFlag() {
      FlagService.submitFlag(this.challDetails.id, this.flag).then(Response => {
        alert(Response.data.message);
      });
    },
    isDisabled: function() {
      let flag = document.getElementById("flag-input").value;
      if (flag != "") {
        this.disable = true;
      } else {
        this.disable = false;
      }
    },
    // markedStatus: function() {
    //   this.marked = !this.marked;
    // },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
