<template>
  <div class="adminNotifCard">
    <p class="adminNotifTitle">
      {{ this.title }}
      <span v-if="this.isNew"><img src="@/assets/new-tag.svg"/></span>
    </p>
    <p class="adminNotifTime">{{ this.time }}</p>
    <p class="adminNotifDesc">{{ this.description }}</p>
  </div>
</template>

<script>
export default {
  name: " NotificationTab",
  props: ["title", "description", "time", "isNew"]
};
</script>
