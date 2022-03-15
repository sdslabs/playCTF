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
            class="adminFormTitle inputField"
            id="password"
            name="user_pass"
            placeholder="New Password*"
            required="true"
            @keyup.enter="triggerReset"
          />
        </div>
        <div class="info">
          <input
            v-model="confirmPassword"
            type="password"
            class="adminFormTitle inputField"
            id="confirmpassword"
            name="user_pass"
            placeholder="Confirm Password*"
            required="true"
            @keyup.enter="triggerReset"
          />
          <div class="error-box" v-if="PassErr">
            <img src="@/assets/error.svg" class="errImg" /> {{ this.PassErr }}
          </div>
        </div>
        <Button
          :onclick="reset"
          class="auth-button"
          variant=" primary-cta"
          :disabled="!(password && confirmPassword)"
          text="Change Password"
        />
      </div>
      <img src="@/assets/login.svg" class="auth-image" />
    </div>
  </div>
</template>

<script>
import LoginUser from "../api/admin/authAPI";
import ErrorBox from "../components/ErrorBox";
import Button from "@/components/Button.vue";

export default {
  name: "login",
  data() {
    return {
      msg: null,
      icon: null,
      PassErr: false,
      password: "",
      confirmPassword: "",
      errorIcon: "error-white",
      tickIcon: "tick-white"
    };
  },
  components: {
    ErrorBox,
    Button
  },
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    triggerReset() {
      if (this.password && this.password2) {
        this.reset();
      }
    },
    async reset() {
      if (this.password !== this.confirmPassword) {
        this.$vToastify.setSettings({
          theme: "beast-error"
        });
        this.$vToastify.error("Passwords don't match", "Error");
      } else {
        this.PassErr = false;
        const state = await LoginUser.resetPassword(this.password);
        if (state) {
          this.$vToastify.setSettings({
            theme: "beast-success"
          });
          this.$vToastify.success("Successfully changed", "Success");
          await this.sleep(3000);
          this.$router.push("/about");
        } else {
          this.$vToastify.setSettings({
            theme: "beast-error"
          });
          this.$vToastify.error("Unauthorized access", "Error");
        }
      }
    }
  },
  beforeCreate() {
    this.$store.commit("updateCurrentPage", "ResetPassword");
  }
};
</script>
