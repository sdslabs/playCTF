<template>
  <div id="auth-layout">
    <div class="navbar">
      <nav v-if="pathLogin()" class="navbar-container">
        <router-link to="/" class="navbar-link"
          ><div class="logo"></div
        ></router-link>
        <div class="navbar-registration">
          <p class="navbar-already-registered">New here?</p>
          <router-link to="/register" class="login-link">REGISTER</router-link>
        </div>
      </nav>
      <nav v-else class="navbar-container">
        <router-link to="/" class="navbar-link"
          ><div class="logo"></div
        ></router-link>
        <div class="navbar-registration">
          <p class="navbar-already-registered">Already Registered?</p>
          <router-link to="/login" class="login-link">LOG IN</router-link>
        </div>
      </nav>
    </div>
    <div id="container">
      <slot />
    </div>
    <AdminFooter />
  </div>
</template>

<script>
import AdminFooter from "../components/AdminFooter.vue";
export default {
  name: "AuthLayout",
  components: {
    AdminFooter,
  },
  methods: {
    pathLogin() {
      var route = this.$route.name;
      return route.includes("login");
    },
  },
};
</script>

<style scoped>
#container {
  padding-left: 25%;
  padding-right: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15rem;
}
</style>