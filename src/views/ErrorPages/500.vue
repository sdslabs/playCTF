<template>
  <div class="error-main-container">
    <Error :error="error" /><button class="primary-btn" @click="refresh">
      Refresh
    </button>
  </div>
</template>

<script>
import Error from "../../components/Error";
export default {
  Name: "ErrorPage500",
  components: {
    Error,
  },
  data() {
    return {
      error: {
        code: 500,
        msg: "Internal Server Error",
      },
    };
  },
  methods: {
    refresh() {
      this.$router.go(-1);
    },
  },
};
</script>
