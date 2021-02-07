<template>
  <div class="login">
    <div class="login-heading">Login</div>
    <div class="login-form-div">
      <form class="login-form">
        <div class="login-info">
          <input
            type="text"
            class="login-inputField name"
            id="username"
            name="user_name"
            placeholder="Team Name*"
            required="true"
          />
        </div>
        <div class="login-info">
          <input
            type="password"
            class="login-inputField password"
            id="password"
            name="user_pass"
            placeholder="Password*"
            required="true"
          />
        </div>
        <div v-on:click="login()" class="login-button">Login</div>
      </form>
      <img src="@/assets/login.svg" class="login-image" />
    </div>
  </div>
</template>

<script>
import LoginUser from "../api/admin/authAPI.js";
export default {
  name: "login",
  components: {
  },
  methods: {
    async login() {
      const name = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      LoginUser.loggedInUser(name, password);
    },
  }
};
</script>
