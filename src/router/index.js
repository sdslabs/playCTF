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
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "auth-layout"
    },
    beforeEnter: function (to, from, next) {
      if(store.getters.getState) {
        if(store.getters.getRole === "admin") {
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

// router.beforeEach((to, from, next) => {
//   let loginPages = ["/login", "/register"];
//   let pagePath = to.path;
//   if (
//     loginPages.includes(pagePath) &&
//     store.getters.getAccess &&
//     store.getters.getRole
//   ) {
//     if (store.getters.getRole === "admin") {
//       router.push("/admin/");
//     } else {
//       router.push("/about");
//     }
//   } else if (loginPages.includes(pagePath)) {
//     next();
//   } else if (!store.getters.getState) {
//     next({
//       path: "/login",
//       query: { redirect: to.path }
//     });
//   } else {
//     let adminPages = "/admin/";
//     let userPages = [
//       "/challenges",
//       "/leaderboard",
//       "/notifications",
//       "/about",
//       "/"
//     ];
//     if (userPages.includes(pagePath) && store.getters.getAccess) {
//       next();
//     } else if (pagePath.includes(adminPages) && store.getters.getAccess) {
//       next();
//     } else {
//       next({
//         path: "/login",
//         query: { redirect: to.path }
//       });
//     }
//   }
// });

export default router;
