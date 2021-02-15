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
import Home from "@/views/Landing.vue";
import Register from "@/views/Register.vue";
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
    component: Login,
    meta: {
      layout: "user-layout"
    }
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminLanding,

    meta: {
      layout: "admin-landing-layout"
    }
  },
  {
    path: "/admin/statistics",
    name: "adminStatistics",
    component: AdminStatistics,
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
    component: Register,
    meta: {
      layout: "user-layout"
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let loginPages = ["/login", "/register"];
  let pagePath = to.path;
  if (loginPages.includes(pagePath) && store.getters.getAccess) {
    if (store.getters.getRole === "admin") {
      router.push("/admin/");
    } else {
      router.push("/");
    }
  } else if (loginPages.includes(pagePath)) {
    next();
  } else if (!store.getters.getState) {
    next({
      path: "/login",
      query: { redirect: to.path }
    });
  } else {
    let adminPages = "/admin/";
    let userPages = [
      "/challenges",
      "/leaderboard",
      "/notifications",
      "/about",
      "/"
    ];
    if (userPages.includes(pagePath) && store.getters.getAccess) {
      next();
    } else if (pagePath.includes(adminPages) && store.getters.getAccess) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.path }
      });
    }
  }
});

export default router;
