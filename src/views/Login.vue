<template>
  <div class="login">
    <div class="container">
      <div class="login-heading">Login</div>
      <div v-if="err.msg">
        <ErrorBox :error="err" />
      </div>
    </div>
    <div class="login-form-div">
      <div class="login-form">
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
import ErrorBox from "../components/ErrorBox";
export default {
  name: "login",
  data() {
    return {
      err:{
        msg: null,
        icon: "error-white",
      },
      username: "",
      password: "",
    };
  },
  components: {
    ErrorBox,
  },
  methods: {
    async login() {
      const check = await LoginUser.loggedInUser(this.username, this.password);
      if (check === 400) {
        this.err.msg = "User not registered";
      } else if (check === 401) {
        this.err.msg = "Wrong credentials";
      } else if (check === 403) {
        this.err.msg = "User banned";
      }
    },
  },
};
</script>
