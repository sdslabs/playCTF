<template>
  <div class="adminNavbar">
    <nav class="adminNavbarContainer">
      <router-link to="/admin/statistics" class="adminNavbarLink"
        >Statistics</router-link
      >
      <router-link to="/admin/notifications" class="adminNavbarLink"
        >Notifications</router-link
      >
      <router-link to="/admin/users" class="adminNavbarLink">Users</router-link>
      <router-link to="/admin/leaderboard" class="adminNavbarLink"
        >Leaderboard</router-link
      >
      <router-link to="/admin/challenges" class="adminNavbarLink"
        >Challenges</router-link
      >
      <router-link to="/admin/submissions" class="adminNavbarLink"
        >Submissions</router-link
      >
      <router-link to="/admin/configure" class="adminNavbarLink"
        >Configure</router-link
      >
    </nav>
    <div class="adminNavTimer">
      <p class="adminTimerMessage">Time Remaining</p>
      <Timer class="adminTimerValue" />
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
export default {
  name: "AdminNavbar",
  components: {
    Timer
  }
};
</script>
