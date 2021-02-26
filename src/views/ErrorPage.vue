<template>
  <div class="error-main-container">
    <div class="error-container">
      <img class="error-img" src="@/assets/error-page.svg" />
      <div class="error-msg">{{ code }} - {{ msg }}</div>
    </div>

    <button class="primary-btn" @click="handleClick">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  Name: "ErrorPage",
  props: ["errorCode"],
  data() {
    return {
      code: this.errorCode
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push("/login");
    },
    refresh() {
      this.$router.go(-1);
    },
    redirectToHome() {
      if (this.$store.state.userInfo.role === "admin") {
        this.$router.push("/admin/statistics");
      } else {
        this.$router.push("/about");
      }
    },
    handleClick() {
      switch (this.errorCode) {
        case "401":
          this.redirectToLogin();
          break;
        case "408":
          this.refresh();
          break;
        case "500":
          this.refresh();
          break;
        default:
          this.redirectToHome();
          break;
      }
    }
  },
  computed: {
    msg() {
      switch (this.errorCode) {
        case "401":
          return "Unathorized Access";
        case "408":
          return "Internal Server Error";
        case "500":
          return "Check your Internet Connection";
        default:
          return "Page Not Found";
      }
    },
    buttonText() {
      switch (this.errorCode) {
        case "401":
          return "Login";
        case "408":
          return "Refresh";
        case "500":
          return "Try Again";
        default:
          return "Go To Home";
      }
    }
  }
};
</script>
