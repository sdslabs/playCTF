<template>
  <div class="auth">
    <div class="auth-container">
      <div class="heading">
        Register for n00b<label class="switch">CTF</label>
      </div>
      <ErrorBox v-if="msg" :msg="msg" :icon="icon" />
    </div>
    <div class="form-div">
      <div class="form">
        <div class="info">
          <input v-model="uname" type="text" class="inputField" placeholder="Name*" required @keyup.enter="register" />
        </div>
        <div class="info">
          <input v-model="username" type="text" class="inputField" placeholder="Username*" required @blur="validateUsername" @keyup.enter="register" />
          <div class="text-field-error" v-if="UsernameErr">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ UsernameErr }}</div>
          </div>
        </div>
        <div class="info">
          <input v-model="email" type="text" class="inputField" :readonly="otpVerified" placeholder="Email*" required @blur="validateEmail" @keyup.enter="register" />
          <button @click="sendOTP" class="verify-button" :disabled="EmailErr || otpVerified">Verify Email</button>
          <div class="text-field-error" v-if="EmailErr">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ EmailErr }}</div>
          </div>
        </div>
        <div class="info" v-if="!otpVerified">
          <input v-model="otp" type="text" class="inputField" placeholder="Enter OTP" />
          <button @click="verifyOTP" class="verify-button" :disabled="!otp">Submit OTP</button>
          <div class="text-field-error" v-if="OtpErr">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ OtpErr }}</div>
          </div>
        </div>
        <div class="info">
          <input v-model="password" type="password" class="inputField" placeholder="Password*" required @blur="validatePassword" @keyup.enter="register" />
          <div class="text-field-error" v-if="PassLen">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ PassLen }}</div>
          </div>
        </div>
        <div class="info">
          <input v-model="confirmPassword" type="password" class="inputField" placeholder="Confirm Password*" required @blur="comparePassword" @keyup.enter="register" />
          <div class="text-field-error" v-if="PassErr">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ PassErr }}</div>
          </div>
        </div>
        <Button :onclick="register" variant="primary-cta" class="auth-button" :disabled="!canRegister" text="Register Now" />
      </div>
      <img src="@/assets/login.svg" class="auth-image" />
    </div>
  </div>
</template>

<script>
import RegisterUser from "../api/admin/authAPI.js";
import ErrorBox from "../components/ErrorBox";
import Button from "@/components/Button.vue";
export default {
  name: "register",
  components: {
    ErrorBox,
    Button
  },
  data() {
    return {
      msg: null,
      icon: null,
      uname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
      otpVerified: false,
      UsernameErr: "",
      EmailErr: "",
      PassLen: "",
      PassErr: "",
      OtpErr: "",
      registered: false,
    };
  },
  computed: {
    canRegister() {
      return (
        this.uname &&
        this.username &&
        this.password &&
        this.confirmPassword &&
        this.email &&
        !this.PassErr &&
        !this.PassLen &&
        !this.UsernameErr &&
        !this.EmailErr &&
        this.password === this.confirmPassword &&
        this.otpVerified
      );
    }
  },
  methods: {
    validateUsername() {
      this.UsernameErr = this.username.length > 12 ? "Username should be 12 characters max" : "";
    },
    validateEmail() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.EmailErr = re.test(this.email) ? "" : "Invalid Email";
    },
    validatePassword() {
      this.PassLen = this.password.length < 8 ? "Password should be at least 8 characters" : "";
    },
    comparePassword() {
      this.PassErr = this.password !== this.confirmPassword ? "Passwords don't match" : "";
    },
    async sendOTP() {
      if (!this.EmailErr) {
        this.$vToastify.success("OTP sent to your email", "Success");
      }
    },
    verifyOTP() {
      if (this.otp === "123456") { 
        this.otpVerified = true;
        this.OtpErr = "";
        this.$vToastify.success("Email verified successfully", "Success");
      } else {
        this.OtpErr = "Invalid OTP";
      }
    },
    async register() {
      if (this.canRegister && !this.registered) {
        const registerResponse = await RegisterUser.registerUser(this.uname, this.username, this.email, this.password);
        if (registerResponse.status !== 200) {
          this.$vToastify.error(registerResponse.data.message, "Error");
        } else {
          this.$vToastify.success("Registered Successfully", "Success");
          this.registered = true;
          setTimeout(() => this.$router.push("/login"), 3000);
        }
      }
    }
  }
};
</script>
