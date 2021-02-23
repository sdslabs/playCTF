<template>
  <div class="login">
    <div class="login-heading">Login</div>
    <div class="login-form-div">
      <div class="login-form">
        <div class="error" v-if="err">
          <img src="@/assets/error.svg" class="errImg" /> {{ this.err }}
        </div>
        <div class="login-info">
          <input
            type="text"
            class="login-inputField name"
            id="username"
            name="user_name"
            placeholder="Team Name*"
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
            v-model="password"
          />
        </div>
        <button
          :disabled="!(username && password)"
          @click="login()"
          class="login-button primary-btn"
        >
          Login
        </button>
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
      err: null,
      username: "",
      password: ""
    };
  },
  components: {},
  methods: {
    async login() {
      const check = await LoginUser.loggedInUser(this.username, this.password);
      if (check === 400) {
        this.err = "User not registered";
      } else if (check === 401) {
        this.err = "Wrong credentials";
      } else if (check === 403) {
        this.err = "User banned";
      }
    }
  }
};
</script>
