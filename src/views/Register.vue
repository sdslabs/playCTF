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
          <input
            v-model="uname"
            type="text"
            class="adminFormTitle inputField"
            id="name"
            name="name"
            placeholder="Name*"
            required="true"
            @keyup.enter="triggerRegister"
          />
        </div>
        <div class="info">
          <input
            v-model="username"
            type="text"
            class="adminFormTitle inputField"
            id="username"
            name="user_name"
            placeholder="Username*"
            required="true"
            @keyup.enter="triggerRegister"
          />
        </div>
        <div class="info">
          <input
            v-model="email"
            type="text"
            class="adminFormTitle inputField"
            id="email"
            name="user_email"
            placeholder="Email*"
            required="true"
            @keyup.enter="triggerRegister"
          />
          <div class="text-field-error" v-if="EmailErr">
            <img src="@/assets/error.svg" class="errImg" /> {{ this.EmailErr }}
          </div>
        </div>
        <div class="info">
          <input
            v-model="password"
            type="password"
            class="adminFormTitle inputField"
            id="password"
            name="user_pass"
            placeholder="Password*"
            required="true"
            @keyup.enter="triggerRegister"
          />
        </div>
        <div class="info">
          <input
            v-model="password2"
            type="password"
            class="adminFormTitle inputField"
            id="confirmpassword"
            name="user_pass"
            placeholder="Confirm Password*"
            required="true"
            @keyup.enter="triggerRegister"
          />
          <div class="text-field-error" v-if="PassErr">
            <img src="@/assets/error.svg" class="errImg" /> {{ this.PassErr }}
          </div>
        </div>
        <Button
          :onclick="register"
          variant="primary-cta"
          class="auth-button"
          :disabled="!(uname && username && password && password2 && email)"
          text="Register Now"
        />
      </div>
      <img src="@/assets/registration.svg" class="auth-image" />
    </div>
  </div>
</template>

<script>
import RegisterUser from "@/api/admin/authAPI.js";
import ErrorBox from "@/components/ErrorBox";
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
      password2: "",
      status: false,
      EmailErr: false,
      PassErr: false,
      registered: true,
      errorIcon: "error-white",
      tickIcon: "tick-white"
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    triggerRegister() {
      if (
        this.uname &&
        this.username &&
        this.password &&
        this.password2 &&
        this.email
      ) {
        this.register();
      }
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
          this.msg = "Registration Failed";
          this.icon = this.errorIcon;
        } else {
          this.msg = "Registered Successfully";
          this.icon = this.tickIcon;
          this.registered;
          await this.sleep(3000);
          this.$router.push("/login");
        }
      }
    }
  }
};
</script>
