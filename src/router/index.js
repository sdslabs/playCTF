import Vue from "vue";
import VueRouter from "vue-router";
import Challenges from "@/views/Challenges.vue";
import Leaderboard from "@/views/Leaderboard.vue";
import Notification from "@/views/Notifications.vue";
import Login from "@/views/Login.vue";
import AdminLanding from "../views/AdminLanding.vue";
import AdminStatistics from "../views/AdminStatistics.vue";
import AdminNotifications from "@/views/AdminNotifications.vue";
import AdminUser from "@/views/AdminUser.vue";
import AdminUsers from "@/views/AdminUsers.vue";
import AdminLeaderboard from "@/views/AdminLeaderboard.vue";
import AdminChallenges from "@/views/AdminChallenges.vue";
import AdminSubmissions from "@/views/AdminSubmissions.vue";
import AdminConfigure from "@/views/AdminConfigure.vue";
import AdminChallenge from "@/views/AdminChallenge.vue";
import ErrorPage401 from "@/views/ErrorPages/401";
import ErrorPage500 from "@/views/ErrorPages/500";
import ErrorPage404 from "@/views/ErrorPages/404";
import ErrorPageNetworkError from "@/views/ErrorPages/NetworkError";
import Home from "@/views/Landing.vue";
import Register from "@/views/Register.vue";
import Reset from "../views/Reset.vue";
import store from "../store/index";

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
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && !store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/challenges",
    name: "challenges",
    component: Challenges,
    meta: {
      layout: "user-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && !store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: Leaderboard,
    meta: {
      layout: "user-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && !store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/notifications",
    name: "notifications",
    component: Notification,
    meta: {
      layout: "user-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && !store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "user-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState) {
        if (store.getters.getAccess) {
          router.push("/admin/");
        }
        else {
          router.push("/about/");
        }
      }
      else {
        next();
      }
    }
  },
  {
    path: "/resetpassword",
    name: "resetpassword",
    component: Reset,
    meta: {
      layout: "user-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && !store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLanding,

    meta: {
      layout: "admin-landing-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/statistics",
    name: "adminStatistics",
    component: AdminStatistics,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/notifications",
    name: "adminNotifications",
    component: AdminNotifications,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/users",
    name: "adminUsers",
    component: AdminUsers,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/users/:username",
    name: "adminUsers",
    component: AdminUser,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/leaderboard",
    name: "adminLeaderboard",
    component: AdminLeaderboard,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/challenges",
    name: "adminChallenges",
    component: AdminChallenges,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/challenges/:id",
    name: "adminChallenge",
    component: AdminChallenge,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/submissions",
    name: "adminSubmissions",
    component: AdminSubmissions,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/admin/configure",
    name: "adminConfigure",
    component: AdminConfigure,
    meta: {
      layout: "admin-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState && store.getters.getAccess) {
        next();
      }
      else {
        router.push("/login");
      }
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      layout: "user-layout"
    },
    beforeEnter: function (to, from, next) {
      if (store.getters.getState) {
        if (store.getters.getAccess) {
          router.push("/admin");
        }
        else {
          router.push("/about");
        }
      }
      else {
        next();
      }
    }
  },
  {
    path: "/error/500",
    name: "500",
    component: ErrorPage500,
    meta: {
      layout: "error-layout"
    }
  },
  {
    path: "/error/networkerror",
    name: "NetworkError",
    component: ErrorPageNetworkError,
    meta: {
      layout: "error-layout"
    }
  },
  {
    path: "/error/401",
    name: "401",
    component: ErrorPage401,
    meta: {
      layout: "error-layout"
    }
  },
  {
    path: "*",
    name: "404",
    component: ErrorPage404,
    meta: {
      layout: "error-layout"
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
