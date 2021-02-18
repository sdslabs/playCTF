<template>
  <div class="login">
    <div class="login-heading">Change Password</div>
    <div class="login-subheading">Choose your new password</div>
    <div class="login-form-div">
      <div class="login-form">
        <div class="login-info">
          <input
            v-model="password"
            type="password"
            class="login-inputField password"
            id="password"
            name="user_pass"
            placeholder="New Password*"
            required="true"
          />
        </div>
        <div class="login-info">
          <input
            v-model="password2"
            type="password"
            class="login-inputField password"
            id="confirmpassword"
            name="user_pass"
            placeholder="Confirm Password*"
            required="true"
          />
        </div>
        <button @click="reset()" class="login-button primary-btn">
          Change Password
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
      password: "",
      password2: ""
    };
  },
  components: {},
  methods: {
    async reset() {
      if (this.password !== this.password2) {
        alert("Passwords don't match");
      } else {
        await LoginUser.loggedInUser(this.password);
      }
    }
  }
};
</script>
