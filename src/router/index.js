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
import ErrorPage from "@/views/ErrorPage.vue";
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
      layout: "auth-layout"
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
    path: "/user/:username",
    name: "users",
    component: AdminUser,
    meta: {
      layout: "user-layout"
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "auth-layout"
    },
    beforeEnter: function(to, from, next) {
      if (store.getters.getState) {
        if (store.getters.getRole === "admin") {
          router.push("/admin/");
        } else {
          router.push("/about/");
        }
      } else {
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
      layout: "auth-layout"
    }
  },
  {
    path: "/error/500",
    name: "500",
    component: ErrorPage,
    props: {
      errorCode: "500"
    },
    meta: {
      layout: "error-layout"
    }
  },
  {
    path: "/error/networkerror",
    name: "NetworkError",
    component: ErrorPage,
    props: {
      errorCode: "408"
    },
    meta: {
      layout: "error-layout"
    }
  },
  {
    path: "/error/401",
    name: "401",
    component: ErrorPage,
    props: {
      errorCode: "401"
    },
    meta: {
      layout: "error-layout"
    }
  },
  {
    path: "*",
    name: "404",
    component: ErrorPage,
    props: {
      errorCode: "404"
    },
    meta: {
      layout: "error-layout"
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  let pagePath = to.path;
  let adminPages = "/admin";
  let userPages = ["/challenges", "/leaderboard", "/notifications", "/about"];
  if (pagePath.includes(adminPages) && store.getters.getRole !== "admin") {
    next({
      path: "/error/401"
    });
  } else if (
    userPages.includes(pagePath) &&
    store.getters.getRole !== "contestant"
  ) {
    next({
      path: "/error/401"
    });
  } else if (pagePath === "/") {
    if (store.getters.getRole === "contestant") {
      next({
        path: "/about"
      });
    } else if (store.getters.getRole === "admin") {
      next({
        path: "/admin/statistics"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
