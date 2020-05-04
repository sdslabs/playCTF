import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Landing.vue";
import Challenges from "../views/Challenges.vue";
import Leaderboard from "../views/Leaderboard.vue";
import Notification from "../views/Notifications.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

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
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  routes
});

export default router;
