<template>
  <div class="notification">
    <div class="heading">NOTIFICATIONS</div>
    <spin-loader v-if="loading" />
    <div
      class="user-notif-tabs"
      v-if="notifications.length > 0 && !this.loading"
    >
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
import NotificationTab from "../components/NotificationTab";
import SpinLoader from "../components/spinLoader.vue";
import store from '../api/loginToken';
export default {
  name: "notifications",
  data() {
    return {
      notifications: [],
      loading: true
    };
  },
  created() {
    if (!store.getters.getState || store.getters.getRights) {
      this.$router.push("/");
    }
  },
  mounted() {
    NotificationService.getAllNotifs()
      .then(response => {
        this.notifications = response.data.sort((a, b) => {
          return new Date(a.updated_at).getTime() <
            new Date(b.updated_at).getTime()
            ? 1
            : -1;
        });
      })
      .finally(() => {
        this.loading = false;
      });
  },
  components: {
    NotificationTab,
    SpinLoader
  },
  methods: {
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
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "Notifications");
  }
};
</script>
