<template>
  <div class="navbar">
    <div class="user-navbar-container" v-if="loggedIn()">
      <router-link to="/about" class="navbar-link ctfLogo"
        ><div class="logo">
          <img :src="`${baseUrl}/api/info/logo`" /></div
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
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import { dropdown } from "../constants/images";
import store from "../store/index";
import { CONFIG } from "@/config/config";
export default {
  name: "Navbar",
  data() {
    return {
      dropdown,
      username: "",
      displayDropdownContent: false,
      baseUrl: CONFIG.beastRoot,
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
    showDropdownContent(showContent) {
      this.displayDropdownContent = showContent;
    }
  }
};
</script>
