<template>
  <div class="login">
    <div class="login-heading">Change Password</div>
    <div class="login-subheading">Choose your new password</div>
    <div class="login-form-div">
      <div class="login-form">
        <div class="error" v-if="pass">
          <img src="@/assets/error.svg" class="errImg" /> Passwords don't match
        </div>
        <div class="error" v-else-if="err">
          <img src="@/assets/error.svg" class="errImg" /> Unauthorized Access
        </div>
        <div class="error" v-else-if="changed">
          <div class="no-error">Password changed succesfully</div>
        </div>
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
import LoginUser from "../api/admin/authAPI";
export default {
  name: "login",
  data() {
    return {
      pass: false,
      changed: false,
      err: false,
      password: "",
      password2: "",
    };
  },
  components: {},
    beforeCreate() {
    this.$store.commit("updateCurrentPage", "ResetPassword");
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async reset() {
      if (this.password !== this.password2) {
        this.pass = true;
      } else {
        this.pass = false;
        const state = await LoginUser.resetPassword(this.password);
        if (state) {
          this.changed = true;
          await this.sleep(2000);
          this.$router.push("/about");
        } else {
          this.err = true;
        }
      }
    },
  },
};
</script>
