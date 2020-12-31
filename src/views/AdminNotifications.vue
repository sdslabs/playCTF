<template>
  <div class="mainAdminContainer">
    <div class="adHeadingContainerWithFeedback">
      <div class="adminHeadingName">CREATE NEW NOTIFICATION</div>
      <div class="addFeedback">
        <transition name="fade" v-on:enter="enter">
          <img v-if="showSuccess" src="@/assets/notif-added.svg" />
          <img v-if="showFail" src="@/assets/notif-failed.svg" />
        </transition>
      </div>
    </div>
    <div class="adNotifForm">
      <p class="adFormFields">
        Notification Title<span class="important">*</span>
      </p>
      <input
        v-model="title"
        placeholder="Enter the Notification Title to be displayed"
        class="adFormTitle"
      />
      <p class="adFormFields">Content</p>
      <textarea
        v-model="description"
        placeholder="Enter the Notification Content to be displayed "
      ></textarea>
      <p class="adFormFields">Confirmation<span class="important">*</span></p>
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
          class="adminDisabledSubmitButton"
          :class="{
            adminEnabledSubmitButton: canSubmit,
            adminInactiveSubmitButton: !canSubmit && !subProcessing,
            adminProcSubmitButton: subProcessing
          }"
          :disabled="!canSubmit"
          v-on:click="onSubmit"
        >
          Submit
        </button>
      </div>
    </div>
    <div class="adminHeadingName">PAST NOTIFICATIONS</div>
    <div class="adminNotifTabs" v-if="notifications.length > 0">
      <NotificationTab
        v-for="notif in notifications"
        :key="notif.ID"
        :title="notif.title"
        :description="notif.desc"
        :time="`${duration(notif)} ago`"
        :isNew="isNew(notif) || notif.isNew"
      />
    </div>
    <div class="adminEmptyData" v-else>
      <span> No Notifications posted </span>
    </div>
  </div>
</template>
<script>
import NotificationTab from "../components/NotificationTab";
import NotifService from "../api/admin/notificationsAPI";
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
    NotifService.getAllNotifs().then(response => {
      if (response.status !== 200) {
        console.log(response.data);
      } else {
        console.log(response);
        this.notifications = response.data.sort((a, b) => {
          return new Date(a.updated_at).getTime() <
            new Date(b.updated_at).getTime()
            ? 1
            : -1;
        });
      }
    });
  },
  methods: {
    isNew: function(notification) {
      this.duration(notification);
      return this.hours < 1;
    },
    duration: function(notification) {
      if (notification.isNew) {
        return "Just a moment";
      }
      let notificationTime = new Date(notification.updated_at).getTime();
      let now = new Date().getTime();
      let passTime = now - notificationTime;
      this.calcTime(passTime);
      if (this.days > 0) return this.days + " days";
      else if (this.hours > 0) return this.hours + " hours";
      else if (this.minutes > 0) return this.minutes + " minutes";
      else if (this.seconds > 0) return this.seconds + " seconds";
    },
    calcTime: function(passTime) {
      this.seconds = Math.floor((passTime % (1000 * 60)) / 1000);
      this.minutes = Math.floor((passTime % (1000 * 60 * 60)) / (1000 * 60));
      this.hours = Math.floor(
        (passTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.days = Math.floor(passTime / (1000 * 60 * 60 * 24));
    },
    checkSubmissionValidity() {
      this.canSubmit = this.title.length > 0 && this.checked;
    },
    onSubmit() {
      this.subProcessing = true;
      var self = this;
      NotifService.submitNotif(this.title, this.description)
        .then(response => {
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
        .catch(response => {
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
