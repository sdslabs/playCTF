<template>
  <div class="error-main-container">
    <Error :error="error" />
    <button class="primary-btn" @click="redirectToHome">Go To Home</button>
  </div>
</template>

<script>
import Error from "../../components/Error";
export default {
  Name: "ErrorPage404",
  components: {
    Error
  },
  data() {
    return {
      error: {
        code: 404,
        msg: "Page Not Found"
      }
    };
  },
  methods: {
    redirectToHome() {
      this.$router.push("/");
    }
  }
};
</script>
