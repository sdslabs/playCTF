<template>
  <div class="adminNotifCard">
    <div class="adminNotifCardTitle">
      <div class="adminNotifTitle">
        <span class="text">{{ this.title }}</span>
        <div class="image" v-if="this.isNew">
          <img src="@/assets/new-tag.svg" />
        </div>
      </div>
      <p class="adminNotifTime">{{ this.time }}</p>
    </div>
    <p class="adminNotifDesc">{{ this.description }}</p>
  </div>
</template>

<script>
export default {
  name: " NotificationTab",
  props: ["title", "description", "time", "isNew"]
};
</script>
