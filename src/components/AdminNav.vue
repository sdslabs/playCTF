<template>
  <nav class="navbar-container">
    <div class="link-container">
      <router-link to="/admin/statistics" class="navbar-link"
        >Statistics</router-link
      >
      <router-link to="/admin/notifications" class="navbar-link"
        >Notifications</router-link
      >
      <router-link to="/admin/users" class="navbar-link">Users</router-link>
      <router-link to="/admin/leaderboard" class="navbar-link"
        >Leaderboard</router-link
      >
      <router-link to="/admin/challenges" class="navbar-link"
        >Challenges</router-link
      >
      <router-link to="/admin/submissions" class="navbar-link"
        >Submissions</router-link
      >
      <router-link to="/admin/configure" class="navbar-link"
        >Configure</router-link
      >
    </div>
    <div class="adminNavTimer">
      <p class="adminTimerMessage">Time Remaining</p>
      <Timer class="adminTimerValue" />
    </div>
  </nav>
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
