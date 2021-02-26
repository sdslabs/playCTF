<template>
  <div class="register">
    <div class="container">
      <div class="register-heading">
        Register for n00b<label class="switch">CTF</label>
      </div>
      <div v-if="error.msg">
        <ErrorBox :error="error" />
      </div>
    </div>
    <div class="register-form-div">
      <div class="register-form">
        <div class="register-info">
          <input
            v-model="uname"
            type="text"
            class="register-inputField"
            id="name"
            name="name"
            placeholder="Name*"
            required="true"
          />
        </div>
        <div class="register-info">
          <input
            v-model="username"
            type="text"
            class="register-inputField"
            id="username"
            name="user_name"
            placeholder="Username*"
            required="true"
          />
        </div>
        <div class="register-info">
          <input
            v-model="email"
            type="text"
            class="register-inputField"
            id="email"
            name="user_email"
            placeholder="Email*"
            required="true"
          />
          <div class="error-box" v-if="EmailErr">
            <img src="@/assets/error.svg" class="errImg" /> {{ this.EmailErr }}
          </div>
        </div>
        <div class="info">
          <input
            v-model="password"
            type="password"
            class="register-inputField password"
            id="password"
            name="user_pass"
            placeholder="Password*"
            required="true"
          />
        </div>
        <div class="info">
          <input
            v-model="password2"
            type="password"
            class="register-inputField password"
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
          @click="register()"
          class="login-button primary-btn"
          :disabled="!(uname && username && password && password2 && email)"
        >
          Register Now
        </button>
      </div>
      <img src="@/assets/registration.svg" class="register-image" />
    </div>
  </div>
</template>

<script>
import RegisterUser from "../api/admin/authAPI.js";
import ErrorBox from "../components/ErrorBox";
export default {
  name: "register",
  components: {
    ErrorBox,
  },
  data() {
    return {
      error: {
        msg: null,
        icon: null,
      },
      uname: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      status: false,
      EmailErr: false,
      PassErr: false,
      registered: true,
      errorIcon: "error-white",
      tickIcon: "tick-white",
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async register() {
      if (!this.validateEmail(this.email)) {
        this.EmailErr = "Invalid Email";
      } else {
        this.EmailErr = false;
      }
      if (this.password !== this.password2) {
        this.PassErr = "Passwords don't match";
      } else {
        this.PassErr = false;
      }
      if (!this.PassErr && !this.EmailErr) {
        this.status = RegisterUser.registeredUser(
          this.uname,
          this.username,
          this.email,
          this.password
        );
        if (!this.status) {
          this.error.msg = "Registration Failed";
          this.error.icon = this.errorIcon;
        } else {
          this.error.msg = "Registered Successfully";
          this.error.icon = this.tickIcon;
          this.registered;
          await this.sleep(3000);
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>
