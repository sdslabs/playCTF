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
  </div>
</template>

<script>
export default {
  name: "AdminNavbar"
};
</script>
