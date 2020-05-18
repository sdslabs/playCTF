<template>
  <div class="challCard">
    <div class="challCard-firstLine">
      <div class="challCard-challName">{{ challName }}</div>
      <div class="challCard-tag">{{ tag }}</div>
      <div v-if="marked" class="challCard-bookmark" v-on:click="markedStatus()">
        <img src="@/assets/marked.svg" />
        <p class="challCard-review">Marked for review</p>
      </div>
      <div v-else class="challCard-bookmark" v-on:click="markedStatus()">
        <img src="@/assets/unmarked.svg" />
        <p class="challCard-review">Mark for review</p>
      </div>
    </div>
    <div class="challCard-solves">
      {{ challPoints }} Points | {{ challSolves }} Solves
    </div>
    <div class="challCard-challDesc">{{ challDesc }}</div>
    <div class="challCard-resources">
      <div v-if="challPort" class="challCard-challPort">
        Port: {{ challPort }}
      </div>
      <a :href="challLink"
        ><div v-if="challLink" class="challCard-challLink">{{ challLink }}</div>
      </a>

      <a v-if="challItem" :href="challItem.link"
        ><div class="challCard-challItem">
          <img
            class="challCard-challItem-download"
            src="@/assets/download.svg"
          />
          {{ challItem.displayName }}
        </div>
      </a>
    </div>
    <div class="challCard-bottom-row">
      <form class="challCard-form">
        <input
          type="text"
          name="flag"
          class="challCard-form-input"
          id="flag-input"
          placeholder="Start typing flag here..."
          v-validate="'required'"
          v-model="disable"
        />
        <Button
          class="challCard-form-submit-button"
          :disabled="disable"
          text="Submit Flag"
        ></Button>
      </form>
      <div class="challCard-report" @click="showModal()">
        Report <img class="challCard-report-bug" src="@/assets/bug.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "ChallCard",
  components: {
    Button
  },
  props: ["challName", "tag"],
  data() {
    return {
      marked: false,
      challPoints: 115,
      challSolves: 12,
      challDesc:
        "Mindbl0wn has a safe repository of files. The filename is signed using mindbl0wn's private key (using the PKCS-1 standard). Anyone willing to read a file, has to ask for a signature from mindbl0wn. But mindbl0wn is currently unavailable. Can you still access a file named 'flag' on mindbl0wn's repository?",
      challLink: "http://challanges.beast.com:11003",
      challPort: 11003,
      challItem: {
        displayName: "mindbl0wn.exe",
        link: "http://google.com"
      }
    };
  },
  state: {
    disable: false,
    marked: false,
    isModalVisible: false
  },
  methods: {
    isDisabled: function() {
      let flag = document.getElementById("flag-input").value;
      if (flag != "") {
        this.disable = true;
      } else {
        this.disable = false;
      }
    },
    markedStatus: function() {
      this.marked = !this.marked;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>
