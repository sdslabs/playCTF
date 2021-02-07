<template>
  <div class="register">
    <div class="register-heading">Register for n00b<label class="switch">CTF</label></div>
    <div class="register-form-div">
      <form class="register-form">
         <div class="register-info">
          <label class="label">Name*</label>
          <input
            type="text"
            class="register-inputField email"
            id="name"
            name="name"
            placeholder="Name*"
            required=true
          />
        </div>
        <div class="register-info">
          <input
            type="text"
            class="register-inputField email"
            id="username"
            name="user_name"
            placeholder="Username*"
            required=true
          />
        </div>
        <div class="register-info">
          <input
            type="text"
            class="register-inputField email"
            id="email"
            name="user_email"
            placeholder="Email*"
            required=true
          />
        </div>
        <div class="info">
          <input
            type="password"
            class="register-inputField password"
            id="password"
            name="user_pass"
            placeholder="Password*"
            required=true
          />
        </div>
        <div class="info">
          <input
            type="password"
            class="register-inputField password"
            id="confirmpassword"
            name="user_pass"
            placeholder="Confirm Password*"
            required=true
          />
        </div>
        <div class="info">
          <input
            type="password"
            class="register-inputField password"
            id="ssh"
            name="ssh"
            placeholder="ssh key"
          />
        </div>
        <div v-on:click="register()" class="register-button">Register Now</div>
      </form>
      <img src="@/assets/registration.svg" class="register-image"/>
    </div>
  </div>
</template>

<script>
import RegisterUser from "../api/admin/authAPI.js";
export default {
  name: "register",
  components: {
  },
  methods: {
    async register() {
      const name = document.getElementById("name").value;
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const password2 = document.getElementById("confirmpassword").value;
      const ssh = document.getElementById("ssh").value;
      if(password === password2) {
        RegisterUser.registeredUser(name, username, email, password, ssh);
      }
      else {
        alert("Passwords don't match");
      }
    },
  }
};
</script>
