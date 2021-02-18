<template>
  <div class="error-main-container">
    <Error :error="error" /><button
      class="primary-btn"
      @click="redirectToLogin"
    >
      Login
    </button>
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
        code: 401,
        msg: "Unathorized Access"
      }
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
