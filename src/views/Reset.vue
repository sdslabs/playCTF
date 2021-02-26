<template>
  <div class="login">
    <div class="container">
      <div class="login-heading">Change Password</div>
      <div v-if="error.msg">
        <ErrorBox :error="error" />
      </div>
    </div>
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
          <div class="error-box" v-if="PassErr">
            <img src="@/assets/error.svg" class="errImg" /> {{ this.PassErr }}
          </div>
        </div>
        <button
          @click="reset()"
          class="login-button primary-btn"
          :disabled="!(password && password2)"
        >
          Change Password
        </button>
      </div>
      <img src="@/assets/login.svg" class="login-image" />
    </div>
  </div>
</template>

<script>
import LoginUser from "../api/admin/authAPI";
import ErrorBox from "../components/ErrorBox";
export default {
  name: "login",
  data() {
    return {
      error: {
        msg: null,
        icon: null,
      },
      PassErr: false,
      password: "",
      password2: "",
      errorIcon: "error-white",
      tickIcon: "tick-white",
    };
  },
  components: {
    ErrorBox,
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async reset() {
      if (this.password !== this.password2) {
        this.PassErr = "Passwords don't match";
      } else {
        this.PassErr = false;
        const state = await LoginUser.resetPassword(this.password);
        if (state) {
          this.error.msg = "Succesfully changed";
          this.error.icon = this.tickIcon;
          await this.sleep(3000);
          this.$router.push("/about");
        } else {
          this.error.msg = "Unatuthorized Access";
          this.error.icon = this.errorIcon;
        }
      }
    },
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "ResetPassword");
  },
};
</script>
