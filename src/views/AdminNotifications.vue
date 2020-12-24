<template>
  <div class="main">
    <div class="headingContainer">
      <div class="heading">CREATE NEW NOTIFICATION</div>
      <div class="addFeedback">
        <transition name="fade" v-on:enter="enter">
          <img v-if="showSuccess" src="@/assets/notif-added.svg" />
          <img v-if="showFail" src="@/assets/notif-failed.svg" />
        </transition>
      </div>
    </div>
    <div class="form">
      <p class="fields">Notification Title<span class="important">*</span></p>
      <input
        v-model="title"
        placeholder="Enter the Notification Title to be displayed"
        class="title"
      />
      <p class="fields">Content</p>
      <textarea
        v-model="description"
        placeholder="Enter the Notification Content to be displayed "
      ></textarea>
      <p class="fields">Confirmation<span class="important">*</span></p>
      <div class="confirmation">
        <input
          type="checkbox"
          id="checkbox"
          class="checkbox"
          v-model="checked"
          @change="checkSubmissionValidity"
        />
        <label for="checkbox"
          >I have checked all the information and no further changes shall be
          made.</label
        >
        <button
          class="submitButton"
          :class="{
            active: canSubmit,
            inactive: !canSubmit && !subProcessing,
            processing: subProcessing
          }"
          :disabled="!canSubmit"
          v-on:click="onSubmit"
        >
          Submit
        </button>
      </div>
    </div>
    <div class="heading">PAST NOTIFICATIONS</div>
    <div class="notifTabs" v-if="notifications.length > 0">
      <NotificationTab
        v-for="notif in notifications"
        :key="notif.ID"
        :title="notif.title"
        :description="notif.desc"
        :time="formatTime(notif.updated_at)"
        :isNew="notif.isNew"
      />
    </div>
    <div class="empty" v-else>
      <span> No Notifications posted </span>
    </div>
  </div>
</template>
<script>
import NotificationTab from "../components/NotificationTab";
import axios from "axios";
export default {
  name: "AdminNotfications",
  components: {
    NotificationTab
  },
  data() {
    return {
      showSuccess: false,
      showFail: false,
      subProcessing: false,
      canSubmit: false,
      description: "",
      title: "",
      checked: false,
      notifications: []
    };
  },
  mounted() {
    axios.post(`${store.getters.hostUrl}/api/notification/available`).then(response => {
      if (response.status !== 200) {
        console.log(response.data);
      } else {
        console.log(response);
        this.notifications = response.data;
      }
    });
  },
  methods: {
    formatTime(time) {
      return time;
    },
    checkSubmissionValidity() {
      this.canSubmit = this.title.length > 0 && this.checked;
    },
    onSubmit() {
      this.subProcessing = true;
      var bodyFormData = new FormData();
      bodyFormData.append("title", this.title);
      bodyFormData.append("desc", this.description);
      var self = this;
      axios({
        method: "post",
        url: `${hostUrl}/api/notification/add`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(function(response) {
          console.log(response);
          self.notifications = [
            {
              title: self.title,
              desc: self.description,
              updated_at: "Just Now",
              isNew: true
            },
            ...self.notifications
          ];
          self.title = "";
          self.description = "";
          self.checked = false;
          self.canSubmit = false;
          self.subProcessing = false;
          self.showSuccess = true;
        })
        .catch(function(response) {
          console.log(response);
          self.title = "";
          self.description = "";
          self.checked = false;
          self.canSubmit = false;
          self.subProcessing = false;
          self.showFail = true;
        });
    },
    enter: function() {
      var self = this;
      setTimeout(function() {
        self.showSuccess = false;
        self.showFail = false;
      }, 3000); // hide the message after 3 seconds
    }
  },
  watch: {
    title: function() {
      this.canSubmit = this.title.length > 0 && this.checked;
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/adminNotifications.scss";
</style>
