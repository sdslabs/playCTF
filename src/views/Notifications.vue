<template>
  <div class="notification">
    <div class="heading">NOTIFICATIONS</div>
    <div class="notifications">
      <div
        v-for="notify in notification"
        v-bind:key="notify.id"
        class="notificationBox"
      >
        <div class="firstLine">
          <div class="notificationTitle">
            {{ notify.title }}
          </div>
          <div v-if="notify.status" class="notificationStatus">
            <div class="newNotification">{{ isNew(notify) }}</div>
          </div>
          <div class="notificationTiming">
            {{ notify.timing }}
          </div>
        </div>
        <div class="notificationDesc">
          {{ notify.desc }}
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "notifications",
  data() {
    return {
      notification: [
        {
          title: "z3r0_c00l is down for maintainance",
          desc: "Please bear with us. Rest assured, we’re fixing it ASAP.",
          timing: "12 min ago",
          status: 1
        },
        {
          title: "First blood for Mindbl0wn",
          desc:
            "Team Bandits got the first blood. Congratulations team Bandits.",
          timing: "35 min ago",
          status: 1
        },
        {
          title: "CTF is live now",
          desc: "You may start your quest for the flags now.",
          timing: "1 hour ago",
          status: 0
        },
        {
          title: "CTF is live now",
          desc: "You may start your quest for the flags now.",
          timing: "1 hour ago",
          status: 0
        },
        {
          title: "CTF is live now",
          desc: "You may start your quest for the flags now.",
          timing: "1 hour ago",
          status: 0
        },
        {
          title: "CTF is live now",
          desc: "You may start your quest for the flags now.",
          timing: "1 hour ago",
          status: 0
        },
        {
          title: "CTF is live now",
          desc: "You may start your quest for the flags now.",
          timing: "1 hour ago",
          status: 0
        },
        {
          title: "CTF is live now",
          desc: "You may start your quest for the flags now.",
          timing: "1 hour ago",
          status: 0
        }
      ]
    };
  },
  methods: {
    isNew: function(notification) {
      if (notification.status === 1) {
        return "NEW";
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/notification.scss";
</style>
