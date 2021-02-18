<template>
  <div class="error-container">
    <img class="error-img" src="@/assets/error-page.svg" />
    <div class="error-msg">{{ error.code }} - {{ error.msg }}</div>
  </div>
</template>

<script>
export default {
  Name: "Error",
  props: ["error"]
};
</script>
