<template>
  <div class="notification">
    <div class="heading">NOTIFICATIONS</div>
    <spin-loader v-if="loading" />
    <div class="user-notif-tabs" v-else-if="notifications.length > 0">
      <NotificationTab
        v-for="notif in notifications"
        :key="notif.ID"
        :title="notif.title"
        :description="notif.desc"
        :time="`${duration(notif)} ago`"
        :isNew="isNew(notif)"
      />
    </div>
    <div class="adminEmptyData" v-else>
      <span> No Notifications posted </span>
    </div>
  </div>
</template>

<script>
import NotificationService from "@/api/admin/notificationsAPI";
import NotificationTab from "@/components/NotificationTab";
import SpinLoader from "@/components/spinLoader.vue";
import { notifPollingInterval } from "@/constants/constants";
export default {
  name: "notifications",
  data() {
    return {
      notifications: [],
      loading: true,
      pollingId: null
    };
  },
  async mounted() {
    await this.pollNotifications();
  },
  beforeDestroy() {
    clearInterval(this.pollingId);
  },
  components: {
    NotificationTab,
    SpinLoader
  },
  methods: {
    async fetchNotifications() {
      const fetchedNotifications = await NotificationService.getAllNotifs();
      this.notifications = fetchedNotifications.data.sort((a, b) => {
        return new Date(a.updated_at).getTime() <
          new Date(b.updated_at).getTime()
          ? 1
          : -1;
      });
      this.loading = false;
    },
    isNew: function(notification) {
      this.duration(notification);
      if (this.hours < 1) return "NEW";
    },
    duration: function(notification) {
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
    async pollNotifications() {
      await this.fetchNotifications();
      this.pollingId = setInterval(async () => {
        await this.fetchNotifications();
      }, notifPollingInterval);
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "userNotifications");
  }
};
</script>
