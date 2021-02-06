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
            name="user_name"
            placeholder="Name*"
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
        <Button text="Register Now" class="register-button" type="submit" />
      </form>
      <img src="@/assets/registration.svg" class="register-image"/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "register",
  components: {
    Button
  }
};
</script>
