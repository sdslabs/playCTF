<template>
  <div class="auth">
    <div class="auth-container">
      <div class="heading">
        Register for <label class="switch">{{ configData.name }}</label>
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
          />
          <div class="text-field-error" v-if="emailErr">
            <img src="@/assets/error.svg" class="errImg" /> {{ this.emailErr }}
          </div>
        </div>
        <div class="info">
          <select
            v-model="college"
            class="adminFormTitle inputField"
            id="formDropdown"
            placeholder="College*"
          >
            <option value="" class="defaultOption" disabled selected hidden>
              College*
            </option>
            <!-- <option value="undefined" class="adminFormTitle inputField" disabled
              >Select one</option
            > -->
            <option>IIT Bhilai</option>
            <option>IIT Bhubaneswar</option>
            <option>IIT Bombay</option>
            <option>IIT Delhi</option>
            <option>IIT (ISM) Dhanbad</option>
            <option>IIT Dharwad</option>
            <option>IIT Gandhinagar</option>
            <option>IIT Goa</option>
            <option>IIT Guwahati</option>
            <option>IIT Hyderabad</option>
            <option>IIT Indore</option>
            <option>IIT Jammu</option>
            <option>IIT Jodhpur</option>
            <option>IIT Kanpur</option>
            <option>IIT Kharagpur</option>
            <option>IIT Madras</option>
            <option>IIT Mandi</option>
            <option>IIT Palakkad</option>
            <option>IIT Patna</option>
            <option>IIT Roorkee</option>
            <option>IIT Ropar</option>
            <option>IIT Tirupati</option>
            <option>IIT (BHU) Varanasi</option>
            <option>Other</option>
          </select>
          <div class="text-field-error" v-if="collegeErr">
            <img src="@/assets/error.svg" class="errImg" />
            {{ this.collegeErr }}
          </div>
        </div>
        <div class="info">
          <input
            v-model="otherCollege"
            type="text"
            class="adminFormTitle inputField"
            id="otherCollege"
            name="otherCollege"
            placeholder="College*"
            required="true"
            v-if="this.college === 'Other'"
          />
          <div class="text-field-error" v-if="otherCollegeErr">
            <img src="@/assets/error.svg" class="errImg" />
            {{ this.otherCollegeErr }}
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
          />
          <div class="text-field-error" v-if="passErr">
            <img src="@/assets/error.svg" class="errImg" /> {{ this.passErr }}
          </div>
        </div>
        <div>
          <input type="checkbox" id="checkbox" v-model="futureUpdates" />
          <label for="checkbox">Do you want to receive future updates?</label>
        </div>
        <vue-recaptcha
          sitekey="6LdJU_8bAAAAAMme7avv_2va5lOccNXO9ZXd2hoS"
          @verify="recaptchaValidate"
        ></vue-recaptcha>
        <div class="text-field-error" v-if="recaptchaErr">
          <img src="@/assets/error.svg" class="errImg" />
          {{ this.recaptchaErr }}
        </div>
        <Button
          :onclick="register"
          variant="primary-cta"
          class="auth-button"
          :disabled="!(uname && username && password && password2 && email)"
          text="Register Now"
        />
      </div>
      <img src="@/assets/registration.svg" class="auth-image-register" />
    </div>
  </div>
</template>

<script>
import RegisterUser from "../api/admin/authAPI.js";
import ConfigApiService from "../api/admin/configureAPI";
import ErrorBox from "../components/ErrorBox";
import Button from "@/components/Button.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "register",
  components: {
    ErrorBox,
    Button,
    VueRecaptcha
  },
  data() {
    return {
      configData: {},
      msg: null,
      icon: null,
      uname: "",
      username: "",
      college: "",
      otherCollege: "",
      email: "",
      password: "",
      password2: "",
      status: false,
      emailErr: false,
      passErr: false,
      recaptchaErr: false,
      collegeErr: false,
      otherCollegeErr: false,
      futureUpdates: false,
      registered: true,
      errorIcon: "error-white",
      tickIcon: "tick-white",
      recaptcha: null
    };
  },
  mounted() {
    if (!this.fetchedData) {
      ConfigApiService.getConfigs().then(response => {
        this.configData = response.data;
      });
    } else {
      // console.log(this.configs);
      this.configData = this.configs;
    }
  },
  methods: {
    recaptchaValidate(response) {
      this.recaptcha = response ? false : "Captcha invalid or incomplete";
      console.log(this.recaptcha);
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    validateCollege() {
      if (this.college === "") {
        return true;
      }
      return false;
    },
    validateOtherCollege() {
      if (this.otherCollege === "") {
        return true;
      }
      return false;
    },
    async register() {
      if (this.validateCollege()) {
        this.collegeErr = "Select a college";
      } else {
        if (this.college === "Other") {
          if (this.validateOtherCollege()) {
            this.otherCollegeErr = "Enter college name";
          } else {
            this.otherCollegeErr = false;
          }
        }
        this.collegeErr = false;
      }
      // console.log(this.collegeErr)
      if (!this.validateEmail(this.email)) {
        this.emailErr = "Invalid Email";
      } else {
        this.emailErr = false;
      }
      if (this.password !== this.password2) {
        this.passErr = "Passwords don't match";
      } else {
        this.passErr = false;
      }
      if (
        !this.passErr &&
        !this.emailErr &&
        !this.collegeErr &&
        !this.otherCollegeErr &&
        !this.recaptcha
      ) {
        this.status = await RegisterUser.registeredUser(
          this.uname,
          this.username,
          this.college,
          this.email,
          this.password,
          JSON.stringify(this.futureUpdates)
        );
        // console.log(this.status);
        if (this.status === 200) {
          this.msg = "Registered Successfully";
          this.icon = this.tickIcon;
          this.registered;
          await this.sleep(3000);
          this.$router.push("/login");
        } else {
          this.icon = this.errorIcon;
          if (this.status === 400) {
            this.msg = "Email is already in use";
          } else if (this.status === 401) {
            this.msg = "Username already in use";
          } else if (this.status === 403) {
            this.msg = "Something went wrong";
          }
        }
      }
    }
  }
};
</script>
