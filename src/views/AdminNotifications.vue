<template>
  <div class="main">
    <div class="heading">
      CREATE NEW NOTIFICATION
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
        />
        <label for="checkbox"
          >I have checked all the information and no further changes shall be
          made.</label
        >
        <button class="submitButton">
          Submit
        </button>
      </div>
    </div>
    <div class="heading">
      PAST NOTIFICATIONS
    </div>
    <div class="notifTabs">
      <NotificationTab
        v-for="notif in notifications"
        :key="notif.id"
        :title="notif.title"
        :description="notif.description"
        :time="notif.time"
        :isNew="notif.isNew"
      />
    </div>
  </div>
</template>
<script>
import NotificationTab from "../components/NotificationTab";
export default {
  name: "AdminNotfications",
  components: {
    NotificationTab
  },
  data() {
    return {
      description: "",
      title: "",
      checked: false,
      notifications: [
        {
          id: 1,
          title: "Last hour left!",
          description: "Only 1 hour is left to start. Gear up",
          time: "1 hour Ago",
          isNew: true
        },
        {
          id: 2,
          title: "Last hour left!",
          description: "Only 1 hour is left to start. Gear up",
          time: "1 hour Ago",
          isNew: false
        },
        {
          id: 3,
          title: "Last hour left!",
          description: "Only 1 hour is left to start. Gear up",
          time: "1 hour Ago",
          isNew: false
        },
        {
          id: 4,
          title: "Last hour left!",
          description: "Only 1 hour is left to start. Gear up",
          time: "1 hour Ago",
          isNew: false
        },
        {
          id: 5,
          title: "Last hour left!",
          description: "Only 1 hour is left to start. Gear up",
          time: "1 hour Ago",
          isNew: false
        },
        {
          id: 6,
          title: "Last hour left!",
          description: "Only 1 hour is left to start. Gear up",
          time: "1 hour Ago",
          isNew: false
        }
      ]
    };
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/adminNotifications.scss";
</style>