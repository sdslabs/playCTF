<template>
  <div class="auth">
    <div class="auth-container">
      <div class="heading">Login</div>
      <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
    </div>
    <div class="form-div">
      <div class="form">
        <div class="info">
          <input
            type="text"
            class="inputField name"
            id="username"
            name="user_name"
            placeholder="Team Name*"
            v-model="username"
          />
        </div>
        <div class="info">
          <input
            type="password"
            class="inputField password"
            id="password"
            name="user_pass"
            placeholder="Password*"
            v-model="password"
          />
        </div>
        <button
          :disabled="!(username && password)"
          @click="login()"
          class="auth-button primary-btn"
        >
          Login
        </button>
      </div>
      <img src="@/assets/login.svg" class="auth-image" />
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
      msg: null,
      icon: "error-white",
      username: "",
      password: ""
    };
  },
  components: {
    ErrorBox
  },
  methods: {
    async login() {
      const check = await LoginUser.loggedInUser(this.username, this.password);
      if (check === 400) {
        this.msg = "User not registered";
      } else if (check === 401) {
        this.msg = "Wrong credentials";
      } else if (check === 403) {
        this.msg = "User banned";
      }
    }
  }
};
</script>
