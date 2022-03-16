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
            @blur="validateEmail"
          />
          <div class="text-field-error" v-if="EmailErr">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ this.EmailErr }}</div>
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
            @blur="validatePassword"
          />
          <div class="text-field-error" v-if="PassLen">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ this.PassLen }}</div>
          </div>
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
            @blur="comparePassword"
          />
          <div class="text-field-error" v-if="PassErr">
            <img src="@/assets/error.svg" class="errImg" />
            <div>{{ this.PassErr }}</div>
          </div>
        </div>
        <Button
          :onclick="register"
          variant="primary-cta"
          class="auth-button"
          :disabled="
            !(
              uname &&
              username &&
              password &&
              confirmPassword &&
              email &&
              !PassErr &&
              !EmailErr &&
              password === confirmPassword
            )
          "
          text="Register Now"
        />
      </div>
      <img src="@/assets/registration.svg" class="auth-image" />
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
      status: false,
      EmailErr: false,
      PassLen: false,
      PassErr: false,
      registered: true,
      errorIcon: "error-white",
      tickIcon: "tick-white"
    };
  },
  methods: {
    validateEmail(e) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.email)) {
        this.EmailErr = false;
      } else {
        this.EmailErr = "Invalid Email";
      }
    },
    validatePassword(e) {
      if (this.password.length < 8) {
        this.PassLen = "Password should be atleast of 8 characters";
      } else {
        this.PassLen = false;
      }
    },
    comparePassword(e) {
      if (this.password !== this.confirmPassword) {
        this.PassErr = "Passwords don't match";
      } else {
        this.PassErr = false;
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async register() {
      if (!this.PassErr && !this.EmailErr && !this.PassLen) {
        const registerResponse = await RegisterUser.registerUser(
          this.uname,
          this.username,
          this.email,
          this.password
        );
        this.$vToastify.setSettings({
          theme: "beast-error"
        });
        if (registerResponse.status != 200) {
          this.$vToastify.error(registerResponse.data.message, "Error");
        } else {
          this.$vToastify.setSettings({
            theme: "beast-success"
          });
          this.$vToastify.success("Registered Successfully", "Success");
          this.registered;
          await this.sleep(3000);
          this.$router.push("/login");
        }
      }
    }
  }
};
</script>
