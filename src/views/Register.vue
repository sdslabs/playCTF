<template>
  <div class="register">
    <div class="register-heading">
      Register for n00b<label class="switch">CTF</label>
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
          <div class="error" v-if="emailErr">
            <img src="@/assets/error.svg" class="errImg" /> Enter a valid email
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
          <div class="error" v-if="passErr">
            <img src="@/assets/error.svg" class="errImg" /> Passwords don't
            match
          </div>
        </div>
        <button @click="register()" class="login-button primary-btn">
          Register Now
        </button>
      </div>
      <img src="@/assets/registration.svg" class="register-image" />
    </div>
  </div>
</template>

<script>
import RegisterUser from "../api/admin/authAPI.js";
export default {
  name: "register",
  components: {},
  data() {
    return {
      uname: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      emailErr: false,
      passErr: false,
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async register() {
      if (!this.validateEmail(this.email)) {
        this.emailErr = true;
      }
      else {
        this.emailErr = false;
      }
      if (this.password !== this.password2) {
        this.passErr = true;
      }
      else {
        this.passErr = false;
      }
      if (!this.passErr && !this.emailErr) {
        RegisterUser.registeredUser(
          this.uname,
          this.username,
          this.email,
          this.password
        );
      }
    },
  },
};
</script>
