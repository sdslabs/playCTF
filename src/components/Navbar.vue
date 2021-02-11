<template>
  <div class="navbar">
    <nav v-if="loggedIn()" class="navbar-container">
      <router-link to="/" class="navbar-link"
        ><div class="logo"></div
      ></router-link>
      <router-link
        v-for="routes in links"
        v-bind:key="routes.index"
        :class="{
          'navbar-link': true,
          active: routes.text === $store.getters.currentPage
        }"
        :to="`${routes.page}`"
        >{{ routes.text }}
      </router-link>

      <div class="nav-timer">
        <p class="time-remaining">Time remaining</p>
        <p class="timer"><Timer /></p>
      </div>
      <div class="dropdown">
        <button class="dropbtn">
          Team
          <img src="@/assets/dropdown.svg" />
        </button>
        <div class="dropdown-content">
          <a class="dropdown-link" href="#">Dark Theme</a>
          <a class="dropdown-link" href="#">Change Password</a>
          <a class="dropdown-link" href="#">Logout</a>
        </div>
      </div>
    </nav>

    <nav v-else-if="pathLogin()" class="navbar-container">
      <router-link to="/" class="navbar-link"
        ><div class="logo"></div
      ></router-link>
      <div class="navbar-registration">
        <p class="navbar-already-registered">New here?</p>
        <router-link to="/register" class="login-link">REGISTER</router-link>
      </div>
    </nav>

    <nav v-else class="navbar-container">
      <router-link to="/" class="navbar-link"
        ><div class="logo"></div
      ></router-link>
      <div class="navbar-registration">
        <p class="navbar-already-registered">Already Registered?</p>
        <router-link to="/login" class="login-link">LOG IN</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import store from '../api/loginToken';
export default {
  name: "Navbar",
  data() {
    return {
      links: [
        {
          index: 0,
          text: "Challenges",
          page: "/challenges"
        },
        {
          index: 1,
          text: "Leaderboard",
          page: "/leaderboard"
        },
        {
          index: 2,
          text: "Notifications",
          page: "/notifications"
        },
        {
          index: 3,
          text: "AboutCTF",
          page: "/about"
        }
      ]
    };
  },
  components: {
    Timer
  },
  methods: {
    loggedIn() {
      if (store.getters.getState) {
        return true;
      }
      else {
        return false;
      }
    },
    pathLogin() {
      var route = this.$route.name;
      return route.includes("login")
    }
  }
};
</script>
