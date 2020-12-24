<template>
  <div class="notification">
    <div class="heading">NOTIFICATIONS</div>
    <div v-if="this.notification.length != 0" class="notifications">
      <div
        v-for="notify in notification.Notifications.reverse()"
        v-bind:key="notify.ID"
        class="notificationBox"
      >
        <div class="firstLine">
          <div class="notificationTitle">
            {{ notify.Title }}
          </div>
          <div class="notificationStatus">
            <div class="newNotification">{{ isNew(notify) }}</div>
          </div>
          <div class="notificationTiming">{{ duration(notify) }} ago</div>
        </div>
        <div class="notificationDesc">
          {{ notify.Description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "@/api/notificationAPI";

export default {
  name: "notifications",
  data() {
    return {
      notification: []
    };
  },
  methods: {
    isNew: function(notification) {
      this.duration(notification);
      if (this.hours < 1) return "NEW";
    },
    duration: function(notification) {
      let notificationTime = new Date(notification.CreatedAt).getTime();
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
    async getNotification() {
      NotificationService.getNotifications().then(
        (event => {
          this.$set(this, "notification", event);
        }).bind(this)
      );
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "Notifications");
  },
  created() {
    this.getNotification();
  }
};
</script>
