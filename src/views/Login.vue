<template>
  <div class="login">
    <div class="login-heading">Login</div>
    <div class="login-form-div">
      <div class="login-form">
        <div class="login-info">
          <input
            type="text"
            class="login-inputField name"
            id="username"
            name="user_name"
            placeholder="Team Name*"
            required="true"
            v-model="username"
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
            v-model="password"
          />
        </div>
        <button @click="login()" class="login-button">Login</button>
      </div>
      <img src="@/assets/login.svg" class="login-image" />
    </div>
  </div>
</template>

<script>
import LoginUser from "../api/admin/authAPI.js";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  components: {},
  methods: {
    async login() {
      LoginUser.loggedInUser(this.username, this.password);
    }
  }
};
</script>
