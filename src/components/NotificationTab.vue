<template>
  <div class="tab">
    <p class="title">
      {{ this.title }}
      <span v-if="this.isNew"><img src="@/assets/new-tag.svg"/></span>
    </p>
    <p class="timeAgo">{{ this.time }}</p>
    <p class="desc">{{ this.description }}</p>
  </div>
</template>

<script>
export default {
  name: " NotificationTab",
  props: ["title", "description", "time", "isNew"]
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/notificationTab.scss";
</style>
