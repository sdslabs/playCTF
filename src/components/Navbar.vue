<template>
  <div class="navbar">
    <div class="beast">
      <a href="/" class="beast">Beast</a>
    </div>
    <nav class="navbar-container">
      <router-link to="/challenges" class="navbar-link">Challenges</router-link>
      <router-link to="/leaderboard" class="navbar-link"
        >Leaderboard</router-link
      >
      <router-link to="/notifications" class="navbar-link"
        >Notifications</router-link
      >
      <router-link to="/about" class="navbar-link">AboutCTF</router-link>
    </nav>
    <div class="nav-timer">
      <p class="time-remaining">Time remaining</p>
      <p class="timer">02:35:15</p>
    </div>
    <div class="dropdown">
      <button class="dropbtn">
        Team <span class="teamName">Bandits</span>
        <img src="@/assets/dropdown.svg" />
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
  name: "Navbar",
};
</script>
