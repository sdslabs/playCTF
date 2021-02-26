<template>
  <div class="auth">
    <div class="auth-container">
      <div class="heading">Change Password</div>
      <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
    </div>
    <div class="auth-subheading">Choose your new password</div>
    <div class="form-div">
      <div class="form">
        <div class="info">
          <input
            v-model="password"
            type="password"
            class="inputField password"
            id="password"
            name="user_pass"
            placeholder="New Password*"
            required="true"
          />
        </div>
        <div class="info">
          <input
            v-model="password2"
            type="password"
            class="inputField password"
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
          class="auth-button primary-btn"
          :disabled="!(password && password2)"
        >
          Change Password
        </button>
      </div>
      <img src="@/assets/login.svg" class="auth-image" />
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
      msg: null,
      icon: null,
      PassErr: false,
      password: "",
      password2: "",
      errorIcon: "error-white",
      tickIcon: "tick-white"
    };
  },
  components: {
    ErrorBox
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async reset() {
      if (this.password !== this.password2) {
        this.PassErr = "Passwords don't match";
      } else {
        this.PassErr = false;
        const state = await LoginUser.resetPassword(this.password);
        if (state) {
          this.msg = "Succesfully changed";
          this.icon = this.tickIcon;
          await this.sleep(3000);
          this.$router.push("/about");
        } else {
          this.msg = "Unatuthorized Access";
          this.icon = this.errorIcon;
        }
      }
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "ResetPassword");
  }
};
</script>
