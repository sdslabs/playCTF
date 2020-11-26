import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Landing.vue";
import Challenges from "../views/Challenges.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Notification from "../views/Notifications.vue";
import Login from "../views/Login.vue";
import Admin from "../views/AdminLanding.vue";
import AdminNotifications from "../views/AdminNotifications.vue";
import AdminUsers from "../views/AdminUsers.vue";
import AdminLeaderboard from "../views/AdminLeaderboard.vue";
import AdminChallenges from "../views/AdminChallenges.vue";
import AdminSubmissions from "../views/AdminSubmissions.vue";
import AdminConfigure from "../views/AdminConfigure.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "home",
    component: Home
  },
  {
    path: "/challenges",
    name: "challenges",
    component: Challenges
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: Leaderboard
  },
  {
    path: "/notifications",
    name: "notifications",
    component: Notification
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      layout: "admin-layout"
    }
  },
  {
    path: "/admin/notifications",
    name: "adminNotifications",
    component: AdminNotifications,
    meta: {
      layout: "admin-layout"
    }
  },
  {
    path: "/admin/users",
    name: "adminUsers",
    component: AdminUsers,
    meta: {
      layout: "admin-layout"
    }
  },
  {
    path: "/admin/leaderboard",
    name: "adminLeaderboard",
    component: AdminLeaderboard,
    meta: {
      layout: "admin-layout"
    }
  },
  {
    path: "/admin/challenges",
    name: "adminChallenges",
    component: AdminChallenges,
    meta: {
      layout: "admin-layout"
    }
  },
  {
    path: "/admin/submissions",
    name: "adminSubmissions",
    component: AdminSubmissions,
    meta: {
      layout: "admin-layout"
    }
  },
  {
    path: "/admin/configure",
    name: "adminConfigure",
    component: AdminConfigure,
    meta: {
      layout: "admin-layout"
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
