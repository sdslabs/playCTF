<template>
  <div v-if="this.challDetails" class="challCard" :class="{ 'preview-challcard': isPreview }">
    <div class="challCard-firstLine">
      <div class="challCard-challName">{{ challDetails.name }}</div>
      <div v-if="challDetails.isSolved" class="chall-submitted">
        <span>Submitted</span>
        <img src="@/assets/tick.svg" />
      </div>
    </div>
    <div class="challCard-solves">
      {{ challDetails.points }} Points
      <span v-if="challDetails && challDetails.solves">| {{ challDetails.solves.length }} Solves</span>
      <span class="attempts-counter" v-if="!isPreview && challDetails.maxAttemptLimit !== -1">
        | {{ challDetails.previous_tries }}/{{ challDetails.maxAttemptLimit }} attempts
      </span>
    </div>
    <div class="challCard-tag-container">
      <span v-for="tag in challDetails.tags" :key="tag" class="challCard-tag">
        {{ tag }}
      </span>
    </div>
    <div class="challCard-challDesc">{{ challDetails.description }}</div>
    <div class="challCard-resources">
      <div v-for="port in this.challDetails.ports" :key="port" class="host aboutText">
        <div class="challenge-link-code" v-on:click="copyUrl(port)">
          {{ getUrl(port) }}
          <span class="tooltiptext">{{ copyText }}</span>
        </div>
      </div>
      <div class="challenge-links">
        <p class="link-heading" v-if="
          this.challDetails.assets.length > 1 ||
          (this.challDetails.assets.length == 1 &&
            this.challDetails.assets[0] != '')
        ">
          Asset Links
        </p>
        <a class="challenge-link aboutText" v-for="asset in this.challDetails.assets"
          :href="getStaticUrl(challDetails.name, asset)" target="_blank" :key="asset">
          {{ getFileFromAsset(asset) }}
        </a>
        <p class="link-heading" v-if="
          this.challDetails.additionalLinks.length > 1 ||
          (this.challDetails.additionalLinks.length == 1 &&
            this.challDetails.additionalLinks[0] != '')
        ">
          Additional Links
        </p>
        <a class="challenge-link" v-for="asset in this.challDetails.additionalLinks" :href="asset" target="_blank"
          :key="asset">
          {{ asset }}
        </a>
      </div>
    </div>
    <div class="challCard-hints" v-if="challDetails.hints && challDetails.hints.length > 0">
      <p class="link-heading">Hints Available</p>
      <div class="hint-buttons">
        <button v-for="hint in challDetails.hints" :key="`hint_${hint.id}`" class="hint-button" :class="{
          'hint-taken': hintStates[hint.id] && hintStates[hint.id].taken,
          'hint-loading': !hintStates[hint.id]
        }" @click="handleHint(hint)" :disabled="!hintStates[hint.id]">
          <div class="hint-button-content">
            <span class="hint-number">Hint {{ hint.id }}</span>
            <span class="hint-points">{{ hint.points }} points</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Hint Confirmation Modal -->
    <div v-if="showConfirmModal" class="modal-overlay" @click="closeConfirmModal">
      <div class="modal-content" @click.stop>
        <h3>{{ isHintTaken ? 'Hint' : 'Take Hint?' }}</h3>
        <p v-if="selectedHint && !isHintTaken">
          Are you sure you want to spend {{ selectedHint.points }} points to view this hint?
        </p>
        <p v-else-if="selectedHint && isHintTaken" class="hint-text">
          {{ hintStates[selectedHint.id] && hintStates[selectedHint.id].description }}
        </p>
        <div class="modal-actions">
          <button class="modal-cancel" @click="closeConfirmModal">
            {{ isHintTaken ? 'Close' : 'Cancel' }}
          </button>
          <button v-if="selectedHint && !isHintTaken" class="modal-confirm" @click="confirmHint">
            Take Hint
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="!challDetails.isSolved && !isPreview && (challDetails.maxAttemptLimit === -1 || challDetails.previous_tries < challDetails.maxAttemptLimit)"
      class="challCard-bottom-row">
      <div class="challCard-form">
        <input name="flag" class="challCard-form-input" id="flag-input" placeholder="Start typing flag here..."
          v-model="flag" @keyup.enter="triggerSubmit" />
        <Button text="Submit Flag" variant="secondary-cta challCard-submit-buttom"
          :disabled="flag.length === 0 || this.showSuccess || this.showFail" :onclick="submitFlag" />
      </div>
    </div>
    <div
      v-else-if="!isPreview && challDetails.maxAttemptLimit !== -1 && challDetails.previous_tries >= challDetails.maxAttemptLimit"
      class="challCard-maxed">
      Maximum attempts reached
    </div>
  </div>
</template>

<script>
import FlagService from "../api/userAPI";
import Button from "@/components/Button.vue";
import HintsService from "../api/admin/hintsAPI";
import { CONFIG } from "@/config/config";

export default {
  name: "ChallCard",
  props: ["challDetails", "tag", "isPreview"],
  components: { Button },
  data() {
    return {
      flag: "",
      showSuccess: false,
      showFail: false,
      link: false,
      copyText: "Click to Copy",
      hintStates: {},
      loadingHints: true,
      showConfirmModal: false,
      selectedHint: null
    };
  },
  computed: {
    loadedHints() {
      if (!this.challDetails || !this.challDetails.hints) return [];
      return this.challDetails.hints.filter(hint => this.hintStates[hint.id]);
    },
    takenHints() {
      if (!this.challDetails || !this.challDetails.hints) return [];
      return this.challDetails.hints.filter(
        hint => this.hintStates[hint.id] && this.hintStates[hint.id].taken
      );
    },
    isHintTaken() {
      return this.selectedHint &&
        this.hintStates[this.selectedHint.id] &&
        this.hintStates[this.selectedHint.id].taken;
    }
  },
  watch: {
    challDetails: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.hints) {
          this.loadHints();
        }
      }
    },
    'challDetails.hints': {
      async handler(newHints) {
        if (newHints) {
          await this.loadHints();
        }
      },
      immediate: true
    }
  },
  methods: {
    async loadHints() {
      if (!this.challDetails.hints) return;

      try {
        for (const hint of this.challDetails.hints) {
          try {
            const response = await HintsService.getHintStatus(hint.id);
            const description = response.data.Description || response.data.description;
            const points = response.data.Points || response.data.points;

            this.$set(this.hintStates, hint.id, {
              description: description,
              points: points,
              taken: description !== "Hint is not taken yet"
            });
          } catch (error) {
            console.error("Error loading hint:", error);

            this.$set(this.hintStates, hint.id, {
              description: "Not enough hint points!",
              points: hint.points,
              taken: false
            });
          }
        }
      } catch (error) {
        console.error("Error loading hints:", error);
      }
    },
    async handleHint(hint) {
      if (!hint) return;
      this.selectedHint = hint;
      this.showConfirmModal = true;
    },

    closeConfirmModal() {
      this.showConfirmModal = false;
      this.selectedHint = null;
    },

    async confirmHint() {
      if (!this.selectedHint) return;

      const hintId = this.selectedHint.id;
      this.showConfirmModal = false;

      try {
        const response = await HintsService.takeHint(hintId);

        if (!response || !response.data) {
          this.$vToastify.setSettings({ theme: "beast-error" });
          this.$vToastify.error("Error fetching hint", "Error");
          return;
        }

        const description = response.data.message;

        if (description) {
          this.$set(this.hintStates, hintId, {
            description: description,
            taken: true
          });

          this.showConfirmModal = true;
        } else {
          this.$vToastify.setSettings({ theme: "beast-error" });
          this.$vToastify.error("Error fetching hint", "Error");
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.$vToastify.setSettings({ theme: "beast-error" });
          this.$vToastify.error(error.response.data.error, "Error");
          return;
        }
        this.$vToastify.setSettings({ theme: "beast-error" });
        this.$vToastify.error("Error fetching hint", "Error");
      }
    },
    getUrl(port) {
      let url = CONFIG.webRoot;
      let ncurl = CONFIG.ncRoot;
      if (
        this.challDetails.category === "service" ||
        this.challDetails.category === "xinetd"
      ) {
        if (this.challDetails.deployedLink == "localhost" || this.challDetails.deployedLink == "") {
          return `nc ${ncurl} ${port}`;
        } else {
          return `nc ${this.challDetails.deployedLink} ${port}`;
        }
      }

      if (this.challDetails.deployedLink == "localhost" || this.challDetails.deployedLink == "") {
        return `${CONFIG.webRoot}:${port}`;
      } else {
        return `http://${this.challDetails.deployedLink}:${port}`;
      }
    },
    getStaticUrl(name, asset) {
      let url = CONFIG.staticRoot;
      return `${url}api/info/download?challenge=${name}&asset=${asset}`;
    },
    getFileFromAsset(asset) {
      let paths = asset.split("/");
      return paths[paths.length - 1];
    },
    triggerSubmit() {
      if (!(this.flag.length === 0 || this.showSuccess || this.showFail)) {
        this.submitFlag();
      }
    },
    submitFlag() {
      FlagService.submitFlag(this.challDetails.id, this.flag).then(Response => {
        this.$vToastify.setSettings({
          position: "center-right",
          theme: "beast-success"
        });
        if (Response.data.success) {
          this.showSuccess = true;
          this.$vToastify.success("Flag submitted successfully", "Success");
        } else {
          this.showFail = true;
          this.$vToastify.setSettings({
            theme: "beast-error"
          });
          this.$vToastify.error(
            Response.data.error ? Response.data.error : Response.data.message,
            "Error"
          );
          // Increment the counter immediately after submission
          if (this.challDetails.maxAttemptLimit !== -1) {
            this.challDetails.previous_tries++;
          }
        }
      });
      var self = this;
      setTimeout(function () {
        if (self.showSuccess) {
          self.$router.go();
        } else {
          self.$emit("updateChallenges");
        }
        self.flag = "";
        self.showSuccess = false;
        self.showFail = false;
      }, 3000);
    },

    async copyUrl(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(this.getUrl(text));
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = this.getUrl(text);

          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.position = "fixed";
          textArea.style.opacity = "0";

          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          try {
            const successful = document.execCommand('copy');
            if (!successful) {
              throw new Error('Copy command failed');
            }
          } catch (err) {
            console.error('Failed to copy text: ', err);
            throw err;
          } finally {
            document.body.removeChild(textArea);
          }
        }

        this.copyText = "Copied";
        setTimeout(() => {
          this.copyText = "Click to Copy";
        }, 1000);

      } catch (err) {
        console.error('Failed to copy: ', err);
        this.copyText = "Copy failed";
        setTimeout(() => {
          this.copyText = "Click to Copy";
        }, 1000);
      }
    },
    isDisabled: function () {
      let flag = document.getElementById("flag-input").value;
      if (flag != "") {
        this.disable = true;
      } else {
        this.disable = false;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },

  mounted() {
    if (
      this.challDetails.category === "service" ||
      this.challDetails.category === "xinetd"
    )
      this.link = false;
    else this.link = true;
  }
};
</script>
