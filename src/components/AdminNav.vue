<template>
  <div class="adminNavbar">
    <nav class="navbar-container">
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
    </nav>
  </div>
</template>

<script>
export default {
  name: "AdminNavbar"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/adminNavbar.scss";
</style>
