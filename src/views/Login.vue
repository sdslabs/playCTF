<template>
  <div class="login">
    <div class="heading">LOG<span class="in"> IN</span></div>
    <div class="form-div">
      <form class="form" action="#" method="POST">
        <div class="info">
          <label class="label">E-mail</label>
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
        <input class="button" type="submit" value="LOG IN" />
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
  name: "login",
  components: {
    Button
  }
};
</script>
