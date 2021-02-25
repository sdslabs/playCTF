<template>
  <div class="error">
    <img
      class="errorImg"
      :src="require('@/assets/' + error.icon + '.svg')"
    />
    <div>
      {{ error.msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorBox",
  props: ["error"]
};
</script>

