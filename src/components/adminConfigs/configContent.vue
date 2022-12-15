<template>
  <div class="configureContent">
    <div class="subfields-row">
      <p class="subfields">
        About
        <span class="importantField">*</span>
      </p>
      <p v-if="showAboutCounter" class="counter">
        {{ maxAbout - content.about.length }} Characters Remaining
      </p>
    </div>
    <textarea
      v-model="content.about"
      @focus="
        () => {
          this.showAboutCounter = true;
        }
      "
      @blur="
        () => {
          this.showAboutCounter = false;
        }
      "
      placeholder="Enter the information to be displayed regarding competition"
    ></textarea>
    <div class="subfields-row">
      <p class="subfields">Prizes</p>
      <p v-if="showPrizeCounter" class="counter">
        {{ maxPrizes - content.prizes.length }} Characters Remaining
      </p>
    </div>
    <textarea
      v-model="content.prizes"
      @focus="
        () => {
          this.showPrizeCounter = true;
        }
      "
      @blur="
        () => {
          this.showPrizeCounter = false;
        }
      "
      placeholder="Enter the information to be displayed regarding prizes"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: "ConfigContent",
  props: ["compContent"],
  data() {
    return {
      content: this.compContent,
      maxAbout: 500,
      maxPrizes: 500,
      showPrizeCounter: false,
      showAboutCounter: false
    };
  },
  methods: {
    emitContent(compInfoContent) {
      this.$emit("changed", compInfoContent);
    }
  },
  watch: {
    content: {
      handler: function(newCompInfoContent) {
        if (this.content.about.length > this.maxAbout) {
          this.content.about = this.content.about.substring(
            0,
            this.content.about.length - 1
          );
          newCompInfoContent.about = this.content.about;
        }
        this.content.prizes = this.content.prizes.replace("\\n", "\n");
        if (this.content.prizes.length > this.maxPrizes) {
          this.content.prizes = this.content.prizes.substring(
            0,
            this.content.prizes.length - 1
          );
          newCompInfoContent.prizes = this.content.prizes;
        }
        this.emitContent(newCompInfoContent);
      },
      deep: true
    },
    compContent: {
      handler(newCompInfoContent) {
        this.content = newCompInfoContent;
      }
    }
  }
};
</script>
