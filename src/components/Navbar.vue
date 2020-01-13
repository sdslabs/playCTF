<template>
  <div class="navbar">
    <div class="beast">
      <a href="/" class="beast">Beast</a>
    </div>
    <nav class="navbar-container" v-if="isUser">
      <router-link to="/challenges" class="navbar-link">Challenges</router-link>
      <router-link to="/leaderboard" class="navbar-link"
        >Leaderboard</router-link
      >
      <router-link to="/notifications" class="navbar-link"
        >Notifications</router-link
      >
      <router-link to="/about" class="navbar-link">AboutCTF</router-link>
    </nav>
    <div class="nav-timer" v-if="isUser">
      <p class="time-remaining">Time remaining</p>
      <p class="timer">02:35:15</p>
    </div>
    <div class="dropdown" v-if="isUser">
      <button class="dropbtn">
        Team
        <img src="@/assets/images/dropdown.svg" />
      </button>
      <div class="dropdown-content">
        <a class="dropdown-link" href="#">Link 1</a>
        <a class="dropdown-link" href="#">Link 2</a>
        <a class="dropdown-link" href="#">Link 3</a>
      </div>
    </div>
    <nav v-if="isLoggedOut">
      <router-link to="/login" class="loggedOut">LOG IN</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "@/assets/scss/navbar.scss";
</style>
