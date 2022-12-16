<template>
  <div class="auth">
    <div class="auth-container">
      <div class="heading">Login <div style="font-size: .5em; color:#ae001d">Note: Teams can create single account and share login credentials with team members.</div></div>
      <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
    </div>
    <div class="form-div">
      <div class="form">
        <div class="info">
          <input
            type="text"
            class="adminFormTitle inputField"
            id="username"
            name="user_name"
            placeholder="Username*"
            v-model="username"
            @keyup.enter="triggerLogin"
          />
        </div>
        <div class="info">
          <input
            type="password"
            class="adminFormTitle inputField"
            id="password"
            name="user_pass"
            placeholder="Password*"
            v-model="password"
            @keyup.enter="triggerLogin"
          />
        </div>
        <Button
          :disabled="!(username && password)"
          :onclick="login"
          class="auth-button"
          variant="primary-cta"
          text="Login"
        />
      </div>
      <img src="@/assets/login.svg" class="auth-image" />
    </div>
  </div>
</template>

<script>
import LoginUser from "../api/admin/authAPI.js";
import ErrorBox from "../components/ErrorBox";
import Button from "@/components/Button.vue";
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
    ErrorBox,
    Button
  },
  methods: {
    triggerLogin() {
      if (this.username && this.password) {
        this.login();
      }
    },
    async login() {
      const loginErrorMessage = await LoginUser.loggedInUser(
        this.username,
        this.password
      );
      if (loginErrorMessage) {
        this.$vToastify.setSettings({ theme: "beast-error" });
        this.$vToastify.error(loginErrorMessage);
      }
    }
  }
};
</script>
