<template>
  <div class="login">
    <div class="login-heading">Login</div>
    <div class="login-form-div">
      <form class="login-form">
        <div class="login-info">
          <input
            type="text"
            class="login-inputField email"
            id="email"
            name="user_email"
            placeholder="Team Name or E-mail*"
          />
        </div>
        <div class="login-info">
          <input
            type="password"
            class="login-inputField password"
            id="password"
            name="user_pass"
            placeholder="Password*"
          />
        </div>
        <Button text="Login" class="login-button" type="submit" />
      </form>
      <img src="@/assets/login.svg" class="login-image"/>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  name: "login",
  components: {
    Button
  }
};
</script>
