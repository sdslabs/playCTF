<template>
  <div class="error-main-container">
    <Error :error="error" /><button class="primary-btn" @click="refresh">
      Try Again
    </button>
  </div>
</template>

<script>
import Error from "../../components/Error";
export default {
  Name: "ErrorPageNetworkError",
  components: {
    Error
  },
  data() {
    return {
      error: {
        code: "Network Problem",
        msg: "Check your Internet Connection"
      }
    };
  },
  methods: {
    refresh() {
      console.log(this.$router.go(-1));
    }
  }
};
</script>
