<template>
  <div class="register">
    <div class="register-heading">Register for n00bCTF</div>
    <div class="register-form">
      <form class="form">
        <div class="info">
          <label class="label">Team Name *</label>
          <input
            type="text"
            class="inputField email"
            id="email"
            name="user_email"
          />
        </div>
        <div class="info">
          <label class="label">Password</label>
          <input
            type="password"
            class="inputField password"
            id="password"
            name="user_pass"
          />
        </div>
        <Button text="LOG IN" type="submit" />
      </form>
      <div class="forgot">
        <a href="#" class="forgot">Forgot Password?</a>
      </div>
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
