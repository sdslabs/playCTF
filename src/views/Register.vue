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
        <div v-if="currentStep === 1">
          <div class="info">
            <input v-model="uname" type="text" class="inputField" placeholder="Name*" required />
          </div>
          <div class="info">
            <input v-model="username" type="text" class="inputField" placeholder="Username*" required @blur="validateUsername" />
            <div class="text-field-error" v-if="UsernameErr">
              <img src="@/assets/error.svg" class="errImg" />
              <div>{{ UsernameErr }}</div>
            </div>
          </div>
          <div class="form-actions">
            <div class="next-arrow" :class="{ disabled: !canProceedToEmail }" @click="proceedToEmail">
              <span class="next-text">Next</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 2">
          <div class="info" v-if="!otpSent">
            <div class="step-title">Setup Email</div>
            <input v-model="email" type="text" class="inputField" :readonly="otpVerified" placeholder="Email*" required @blur="validateEmail" />
            <button @click="sendOTP" class="verify-button" :disabled="!canProceedToOTP">Send OTP</button>
            <div class="text-field-error" v-if="EmailErr">
              <img src="@/assets/error.svg" class="errImg" />
              <div>{{ EmailErr }}</div>
            </div>
          </div>
          <div class="info" v-if="otpSent">
            <div class="verification-message">
              Please enter the OTP sent to {{ email }}
            </div>
            <input v-model="otp" type="text" class="inputField" placeholder="Enter OTP" />
            <button @click="verifyOTP" class="verify-button" :disabled="!otp">Submit OTP</button>
            <div class="text-field-error" v-if="OtpErr">
              <img src="@/assets/error.svg" class="errImg" />
              <div>{{ OtpErr }}</div>
            </div>
            <div class="timer-container">
              <span v-if="timer > 0">Resend OTP in {{ timer }} seconds</span>
              <button v-else @click="sendOTP" class="resend-button">Resend OTP</button>
            </div>
          </div>
        </div>

        <div v-if="currentStep === 3">
          <div class="info">
            <input v-model="password" type="password" class="inputField" placeholder="Password*" required @blur="validatePassword" />
            <div class="text-field-error" v-if="PassLen">
              <img src="@/assets/error.svg" class="errImg" />
              <div>{{ PassLen }}</div>
            </div>
          </div>
          <div class="info">
            <input v-model="confirmPassword" type="password" class="inputField" placeholder="Confirm Password*" required @blur="comparePassword" />
            <div class="text-field-error" v-if="PassErr">
              <img src="@/assets/error.svg" class="errImg" />
              <div>{{ PassErr }}</div>
            </div>
          </div>
          <div class="register-button-container">
            <Button :onclick="register" variant="primary-cta" class="register-button" :disabled="!canRegister" text="Register Now" />
          </div>
        </div>

        <div class="progress-container">
          <div class="progress-steps">
            <div class="step-item" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <div class="step-circle">1</div>
              <div class="step-title">Basic Info</div>
            </div>
            <div class="step-line" :class="{ active: currentStep > 1 }"></div>
            <div class="step-item" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
              <div class="step-circle">2</div>
              <div class="step-title">Setup Email</div>
            </div>
            <div class="step-line" :class="{ active: currentStep > 2 }"></div>
            <div class="step-item" :class="{ active: currentStep >= 3 }">
              <div class="step-circle">3</div>
              <div class="step-title">Set Password</div>
            </div>
          </div>
        </div>

      </div>
      <div class="auth-image-container">
        <img src="@/assets/login.svg" class="auth-image" />
      </div>
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
      currentStep: 1,
      msg: null,
      icon: null,
      uname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
      otpSent: false,
      otpVerified: false,
      UsernameErr: "",
      EmailErr: "",
      PassLen: "",
      PassErr: "",
      OtpErr: "",
      registered: false,
      timer: 0,
      timerInterval: null,
    };
  },
  computed: {
    canProceedToEmail() {
      return this.uname && this.username && !this.UsernameErr;
    },
    canProceedToOTP() {
      return this.email && !this.EmailErr;
    },
    canRegister() {
      return (
        this.password &&
        this.confirmPassword &&
        !this.PassErr &&
        !this.PassLen &&
        this.password === this.confirmPassword &&
        this.otpVerified
      );
    },
    progressWidth() {
      return `${((this.currentStep - 1) / 2) * 100}%`;
    }
  },
  methods: {
    startTimer() {
      this.timer = 60;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.timerInterval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.timerInterval);
        }
      }, 1000);
    },
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
      if (this.canProceedToOTP) {
        this.otpSent = true;
        this.startTimer();
        this.$vToastify.success("OTP sent to your email", "Success");
      }
    },
    verifyOTP() {
      if (this.otp === "123456") { 
        this.otpVerified = true;
        this.OtpErr = "";
        this.$vToastify.success("Email verified successfully", "Success");
        this.currentStep = 3;
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
      } else {
        this.OtpErr = "Invalid OTP";
      }
    },
    proceedToEmail() {
      if (this.canProceedToEmail) {
        this.currentStep = 2;
      } else {
        this.$vToastify.error("Please fill all required fields correctly", "Error");
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
  },
  beforeDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
};
</script>
