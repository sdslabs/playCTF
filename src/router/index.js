import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Landing.vue";
import Challenges from "../views/Challenges.vue";
import About from "../views/About.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Notification from "../views/Notifications.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/challenges",
    name: "challenges",
    component: Challenges
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
  }
];

const router = new VueRouter({
  routes
});

export default router;
