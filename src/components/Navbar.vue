<template>
  <div class="navbar">
    <div class="user-navbar-container" v-if="loggedIn()">
      <router-link to="/about" class="navbar-link ctfLogo"
        ><div class="logo adminFooterTitle">BackdoorCTF</div>
      </router-link>
      <nav class="navbar-container">
        <div class="link-container">
          <router-link
            v-for="routes in getLinks()"
            v-bind:key="routes.index"
            :class="{
              'navbar-link': true,
              active: isActive(routes)
            }"
            :to="`${routes.page}`"
            >{{ routes.text }}
          </router-link>
          <div class="adminNavTimer">
            <p class="adminTimerMessage">Time Remaining</p>
            <Timer class="adminTimerValue" />
          </div>
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
          <router-link
            v-if="this.userRole !== 'admin'"
            :to="userProfilePath"
            class="adminNavDropdownLink"
            >Profile</router-link
          >
          <router-link
            v-if="this.userRole !== 'admin'"
            to="/resetpassword"
            class="adminNavDropdownLink"
            >Change Password</router-link
          >
          <a class="adminNavDropdownLink cursor-pointer" @click="logout()"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import { dropdown } from "../constants/images";
import { CONFIG } from "@/config/config";
import LoginUser from "../api/admin/authAPI.js";
export default {
  name: "Navbar",
  data() {
    return {
      dropdown,
      username: "",
      displayDropdownContent: false,
      baseUrl: CONFIG.beastRoot,
      userRole: LoginUser.getUserInfo().role,
      userLinks: [
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
      ],
      adminLinks: [
        {
          index: 0,
          text: "Statistics",
          page: "/admin/statistics"
        },
        {
          index: 1,
          text: "Notifications",
          page: "/admin/notifications"
        },
        {
          index: 2,
          text: "Users",
          page: "/admin/users"
        },
        {
          index: 3,
          text: "Leaderboard",
          page: "/admin/leaderboard"
        },
        {
          index: 4,
          text: "Challenges",
          page: "/admin/challenges"
        },
        {
          index: 5,
          text: "Submissions",
          page: "/admin/submissions"
        },
        {
          index: 6,
          text: "Configure",
          page: "/admin/configure"
        }
      ],
      userProfilePath: "/user/"
    };
  },
  components: {
    Timer
  },
  created() {
    this.username = LoginUser.getUserInfo().userName;
    this.userProfilePath += this.username;
  },
  methods: {
    isActive(routes) {
      if (this.userRole === "admin") {
        return "admin" + routes.text === this.$store.getters.currentPage;
      } else {
        return "user" + routes.text === this.$store.getters.currentPage;
      }
    },
    getLinks() {
      if (this.userRole === "admin") {
        return this.adminLinks;
      } else {
        return this.userLinks;
      }
    },
    loggedIn() {
      return LoginUser.getUserInfo().login;
    },
    logout() {
      LoginUser.logout();
      this.$router.push("/login");
    },
    showDropdownContent(showContent) {
      this.displayDropdownContent = showContent;
    }
  }
};
</script>
