<template>
  <div class="navbar">
    <div class="user-navbar-container" v-if="loggedIn()">
      <router-link to="/" class="navbar-link ctfLogo"
        ><div class="logo"></div
      ></router-link>
      <nav class="navbar-container">
        <div class="link-container">
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
        </div>
        <div class="adminNavTimer">
          <p class="adminTimerMessage">Time Remaining</p>
          <Timer class="adminTimerValue" />
        </div>
      </nav>
      <div
        class="adminNavDropdown"
        @mouseover="showDropdownContent(true)"
        @mouseleave="showDropdownContent(false)"
      >
        <button class="adminNavDropbtn">
          {{ username }}
          <img :src="dropdown" />
        </button>
        <div v-if="displayDropdownContent" class="adminNavDropdownContent">
          <router-link to="/resetpassword" class="adminNavDropdownLink"
            >Change Password</router-link
          >
          <a class="adminNavDropdownLink" @click="logout()">Logout</a>
        </div>
      </div>
    </div>
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
import { dropdown } from "../constants/images";
import store from "../store/index";
export default {
  name: "Navbar",
  data() {
    return {
      dropdown,
      username: "",
      displayDropdownContent: false,
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
  created() {
    this.username = store.getters.getUsername;
  },
  methods: {
    loggedIn() {
      return store.getters.getState;
    },
    logout() {
      store.commit("logout");
      this.$router.push("/login");
    },
    pathLogin() {
      var route = this.$route.name;
      return route.includes("login");
    },
    showDropdownContent(showContent) {
      this.displayDropdownContent = showContent;
    }
  }
};
</script>
