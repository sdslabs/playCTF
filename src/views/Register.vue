<template>
  <div class="register">
    <div class="register-heading">
      Register for n00b<label class="switch">CTF</label>
    </div>
    <div class="register-form-div">
      <div class="register-form">
        <div class="register-info">
          <label class="label">Name*</label>
          <input
            v-model="uname"
            type="text"
            class="register-inputField email"
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
            class="register-inputField email"
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
            class="register-inputField email"
            id="email"
            name="user_email"
            placeholder="Email*"
            required="true"
          />
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
        </div>
        <button @click="register()" class="register-button">
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
      password2: ""
    };
  },
  methods: {
    async register() {
      if (this.password === this.password2) {
        RegisterUser.registeredUser(
          this.uname,
          this.username,
          this.email,
          this.password
        );
      } else {
        alert("Passwords don't match");
      }
    }
  }
};
</script>
