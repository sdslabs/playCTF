import Vue from "vue";
import VueRouter from "vue-router";
import Challenges from "@/views/Challenges.vue";
import Leaderboard from "@/views/Leaderboard.vue";
import Notification from "@/views/Notifications.vue";
import Login from "@/views/Login.vue";
import Admin from "@/views/AdminLanding.vue";
import AdminNotifications from "@/views/AdminNotifications.vue";
import AdminUser from "@/views/AdminUser.vue";
import AdminUsers from "@/views/AdminUsers.vue";
import AdminLeaderboard from "@/views/AdminLeaderboard.vue";
import AdminChallenges from "@/views/AdminChallenges.vue";
import AdminSubmissions from "@/views/AdminSubmissions.vue";
import AdminConfigure from "@/views/AdminConfigure.vue";
import AdminChallenge from "@/views/AdminChallenge.vue";
import Home from "@/views/Landing.vue";
import Register from "@/views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      layout: "user-layout"
    }
  },
  {
    path: "/about",
    name: "home",
    component: Home,
    meta: {
      layout: "user-layout"
    }
  },
  {
    path: "/challenges",
    name: "challenges",
    component: Challenges,
    meta: {
      layout: "user-layout"
    }
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: Leaderboard,
    meta: {
      layout: "user-layout"
    }
  },
  {
    path: "/notifications",
    name: "notifications",
    component: Notification,
    meta: {
      layout: "user-layout"
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/admin/statistics",
    name: "adminStatistics",
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
    path: "/admin/users/:username",
    name: "adminUsers",
    component: AdminUser,
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
    path: "/admin/challenges/:id",
    name: "adminChallenge",
    component: AdminChallenge,
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
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
