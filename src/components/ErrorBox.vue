<template>
  <div class="error-box">
    <img
      v-if="icon"
      class="errorImg"
      :src="require('@/assets/' + icon + '.svg')"
    />
    <div>
      {{ msg }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorBox",
  props: ["msg", "icon"],
};
</script>

